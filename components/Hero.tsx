// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue, useMotionValue, useSpring } from 'framer-motion';
import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from "@google/genai";
import { Play, Mic, MicOff, Calendar, MessageCircle, CheckCircle, Smartphone, Wifi, Activity, Sparkles, Radio, AlertCircle } from 'lucide-react';
import ReceptionistAvatar from './ReceptionistAvatar';

// --- Audio Helper Functions (No changes) ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- SoundWave Component (Refactored for MotionValue) ---
const SoundWave = ({ active, volume }: { active: boolean; volume: MotionValue<number> }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 h-8">
      {[...Array(5)].map((_, i) => {
        // Middle bars react more to volume to create a wave shape
        const sensitivity = [0.4, 0.7, 1.0, 0.7, 0.4][i];
        
        // Use transform to map volume MotionValue directly to height
        // This avoids re-rendering the component on every volume change
        const height = useTransform(volume, (v) => {
             return active ? Math.max(6, 6 + (v * 30 * sensitivity)) : 6;
        });

        return (
          <motion.div
            key={i}
            className={`w-1.5 rounded-full ${active ? 'bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.6)]' : 'bg-brand-purple/20'}`}
            style={{ height }}
            animate={{ 
              opacity: active ? 1 : 0.5
            }}
            transition={{
              opacity: { duration: 0.3 }
            }}
          />
        );
      })}
    </div>
  );
};

// --- Background Particles Component ---
const BackgroundParticles = () => {
  // Generate stable particles
  const particles = useMemo(() => {
    // Reduced particle count from 60 to 18 for performance
    return Array.from({ length: 18 }).map((_, i) => {
      const isPurple = Math.random() > 0.5;
      return {
        id: i,
        top: Math.random() * 100, // %
        left: Math.random() * 100, // %
        size: Math.random() * 5 + 2, // 2px to 7px
        depth: Math.random() * 400 - 200, // translateZ value for depth
        duration: Math.random() * 20 + 15, // 15s to 35s
        delay: Math.random() * 5,
        color: isPurple ? 'bg-brand-purple' : 'bg-accent-cyan',
        // Removed dynamic glow color for CSS simplification
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none preserve-3d z-[1] gpu-accelerated">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            transform: `translateZ(${p.depth}px)`, 
            opacity: 0.4
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- Tools (No changes) ---
const checkAvailabilityTool: FunctionDeclaration = {
  name: 'check_availability',
  description: 'Checks for available appointment slots for a discovery call based on the preferred date and time.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      preferred_date_time: { type: Type.STRING, description: "The preferred date and time for the call." },
    },
    required: ['preferred_date_time'],
  },
};

const bookCallTool: FunctionDeclaration = {
  name: 'book_call',
  description: 'Books a discovery call with the provided client details.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      client_name: { type: Type.STRING, description: "Full name of the client." },
      email_address: { type: Type.STRING, description: "Work email address." },
      preferred_date_time: { type: Type.STRING, description: "Confirmed date and time for the call (ISO format with offset)." },
      contact_number: { type: Type.STRING, description: "Contact number with country code." },
      clinic_name: { type: Type.STRING, description: "Name of the dental clinic." },
      clinic_location: { type: Type.STRING, description: "Location of the clinic." },
      additional_notes: { type: Type.STRING, description: "Any additional information provided by the client." },
    },
    required: ['client_name', 'email_address', 'preferred_date_time', 'contact_number', 'clinic_name', 'clinic_location'],
  },
};

const WEBHOOK_URL = 'https://hook.eu2.make.com/apatwf54zqt8lvxpdh482fn4bpwuy8of';

interface HeroProps {
    mouseX?: MotionValue<number>;
    mouseY?: MotionValue<number>;
}

// Define specific type for AudioContext constructor to satisfy TS2554
type AudioContextCtor = { new (options?: AudioContextOptions): AudioContext };

const Hero: React.FC<HeroProps> = ({ mouseX, mouseY }) => {
  // --- Live API State ---
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Use MotionValue for volume to prevent re-renders
  const volume = useMotionValue(0);

  const [isButtonAnimating, setIsButtonAnimating] = useState(false);

  // Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  const inputAnalyserRef = useRef<AnalyserNode | null>(null);
  const outputAnalyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Ambient Audio Ref
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  
  // 3D Mouse Interaction Setup
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX || new MotionValue(0), springConfig);
  const mouseYSpring = useSpring(mouseY || new MotionValue(0), springConfig);

  // Card Tilt - Increased range for better 3D feel
  const tiltX = useTransform(mouseYSpring, [-1, 1], [10, -10]);
  const tiltY = useTransform(mouseXSpring, [-1, 1], [-10, 10]);

  // Parallax for floating elements
  const parallaxX = useTransform(mouseXSpring, [-1, 1], [-15, 15]);
  const parallaxY = useTransform(mouseYSpring, [-1, 1], [-15, 15]);
  const parallaxXReverse = useTransform(mouseXSpring, [-1, 1], [15, -15]);

  const openBookingLink = () => {
    window.open('https://cal.com/denticall-ai/15min', '_blank');
  };

  // --- Ambient Audio Logic ---
  useEffect(() => {
    const audioUrl = "https://cdn.pixabay.com/audio/2021/08/09/audio_a4631e27df.mp3"; // "Space Atmosphere"
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0; // Start silent, fade in later
    ambientAudioRef.current = audio;

    const handleFirstInteraction = () => {
      if (ambientAudioRef.current && ambientAudioRef.current.paused && !isActive) {
        ambientAudioRef.current.play().then(() => {
            // Fade in to 10%
            const fadeIn = setInterval(() => {
                if (ambientAudioRef.current && ambientAudioRef.current.volume < 0.1) {
                    ambientAudioRef.current.volume = Math.min(0.1, ambientAudioRef.current.volume + 0.005);
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);
        }).catch(() => {
            // Autoplay blocked still, wait for next click
        });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current = null;
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Handle Ambient Audio Fade In/Out based on isActive
  useEffect(() => {
    const audio = ambientAudioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (isActive) {
        // Fade Out & Pause
        fadeIntervalRef.current = window.setInterval(() => {
            if (audio.volume > 0.005) {
                audio.volume -= 0.005;
            } else {
                audio.volume = 0;
                audio.pause();
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
        }, 30);
    } else {
        // Play & Fade In
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                fadeIntervalRef.current = window.setInterval(() => {
                    if (audio.volume < 0.1) {
                        audio.volume += 0.005;
                    } else {
                        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                    }
                }, 50);
            }).catch(() => {
                // Ignore errors if interaction hasn't happened yet
            });
        }
    }
  }, [isActive]);

  const updateVolume = () => {
    let inputVol = 0;
    let outputVol = 0;

    if (inputAnalyserRef.current) {
      const dataArray = new Uint8Array(inputAnalyserRef.current.frequencyBinCount);
      inputAnalyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      inputVol = sum / dataArray.length;
    }

    if (outputAnalyserRef.current) {
      const dataArray = new Uint8Array(outputAnalyserRef.current.frequencyBinCount);
      outputAnalyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      outputVol = sum / dataArray.length;
    }

    const combinedVol = Math.min((inputVol + outputVol) / 100, 1.5); 
    
    // Set MotionValue directly (no re-render)
    volume.set(combinedVol);

    animationFrameRef.current = requestAnimationFrame(updateVolume);
  };

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e: any) { console.warn("Error closing session", e); }
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => { try { source.stop(); } catch(e: any) {} });
    sourcesRef.current.clear();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsActive(false);
    setStatus('idle');
    volume.set(0);
  };

  const startSession = async () => {
    if (!process.env.API_KEY) {
      setErrorMsg("API Key missing.");
      return;
    }

    setStatus('connecting');
    setErrorMsg('');

    try {
      // 1. Initialize AudioContexts synchronously
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as any;
      if (!AudioContextClass) {
        throw new Error('AudioContext not supported');
      }

      // Explicitly cast to 'any' class to bypass TS2554 error where TS expects 0 arguments
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      
      // CRITICAL FIX: Resume immediately to prevent suspension in deployed environments
      await inputCtx.resume();
      await outputCtx.resume();
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      // 2. Setup Output Chain
      const outputAnalyser = outputCtx.createAnalyser();
      outputAnalyser.fftSize = 256;
      outputAnalyserRef.current = outputAnalyser;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputAnalyser);
      outputAnalyser.connect(outputCtx.destination);

      // 3. Get Microphone Stream (Robust Handling)
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      } catch (err: any) {
        console.error("Microphone Access Error:", err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
           setErrorMsg("Microphone access denied. Please enable permissions in your browser settings.");
        } else if (err.name === 'NotFoundError') {
           setErrorMsg("No microphone found. Please connect a microphone.");
        } else {
           setErrorMsg("Could not access microphone.");
        }
        setStatus('idle');
        return; // Stop execution
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          tools: [{ functionDeclarations: [checkAvailabilityTool, bookCallTool] }],
          systemInstruction: `Role: Sara, DentiCall booking agent. Context: AI communication for dental clinics. Task: Greet, Understand need, Collect details (Name, Number+Code, Email, Clinic Name/Loc), Check availability, Book call. Time: ${currentDate}.`,
        },
        callbacks: {
          onopen: async () => {
            setStatus('active');
            setIsActive(true);
            
            const inputAnalyser = inputCtx.createAnalyser();
            inputAnalyser.fftSize = 256;
            inputAnalyserRef.current = inputAnalyser;

            const source = inputCtx.createMediaStreamSource(stream);
            sourceRef.current = source;
            source.connect(inputAnalyser); 

            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                 session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
            updateVolume();
          },
          onmessage: async (message: LiveServerMessage) => {
             if (message.toolCall?.functionCalls) {
                 for (const fc of message.toolCall.functionCalls) {
                     if (fc.name === 'check_availability' || fc.name === 'book_call') {
                         const args = fc.args as any;
                         let resultMessage = '';
                         const payload = { tool_name: fc.name, ...args };

                         try {
                             const response = await fetch(WEBHOOK_URL, {
                                 method: 'POST',
                                 headers: { 'Content-Type': 'application/json' },
                                 body: JSON.stringify(payload)
                             });
                             
                             if (response.ok) {
                               const data = await response.text(); 
                               resultMessage = data || 'Action successful.'; 
                             } else {
                               resultMessage = 'Failed.';
                             }
                         } catch (e: any) {
                             resultMessage = 'Simulated Success.';
                         }
                         sessionPromise.then((session) => {
                              session.sendToolResponse({
                                  functionResponses: { id: fc.id, name: fc.name, response: { result: resultMessage } }
                              });
                         });
                     }
                 }
             }
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio) {
                const ctx = outputAudioContextRef.current;
                if (ctx) {
                  nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                  const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                  const source = ctx.createBufferSource();
                  source.buffer = audioBuffer;
                  source.connect(outputNode); 
                  source.addEventListener('ended', () => sourcesRef.current.delete(source));
                  source.start(nextStartTimeRef.current);
                  sourcesRef.current.add(source);
                  nextStartTimeRef.current += audioBuffer.duration;
                }
             }
             if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(source => { try { source.stop(); } catch(e: any) {} });
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
             }
          },
          onclose: () => { stopSession(); },
          onerror: (err) => { 
              console.error("Live API Error:", err);
              setErrorMsg("Connection Failed."); 
              stopSession(); 
          }
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (error) {
      console.error("Start Session Error:", error);
      setErrorMsg("Failed to start.");
      setStatus('idle');
    }
  };

  const handleToggle = (e?: React.MouseEvent) => { 
    if (e) e.preventDefault();
    
    // Trigger visual feedback
    setIsButtonAnimating(true);
    setTimeout(() => setIsButtonAnimating(false), 500);

    if (isActive) stopSession(); 
    else startSession(); 
  };
  
  useEffect(() => { return () => stopSession(); }, []);

  return (
    <section className="relative w-full min-h-screen bg-white pt-24 md:pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center perspective-container">
      
      {/* 3D Background Elements - Parallax & Particles - Simplified for Performance */}
      <motion.div style={{ y: y1 }} className="absolute top-[20%] right-[10%] w-80 h-80 bg-purple-200/30 rounded-full blur-[60px] pointer-events-none -z-10 mix-blend-multiply" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-blue-200/30 rounded-full blur-[60px] pointer-events-none -z-10 mix-blend-multiply" />
      
      {/* --- FLOATING PURPLE HEARTBEAT LIGHT --- */}
      <motion.div 
         className="absolute w-[300px] h-[300px] bg-[#8b5cf6] rounded-full blur-[90px] pointer-events-none -z-10 opacity-40 mix-blend-screen"
         animate={{ 
           scale: [1, 1.3, 1],
           opacity: [0.3, 0.6, 0.3],
           x: [-100, 100, -100],
           y: [-50, 50, -50]
         }}
         transition={{ 
           scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, // Heartbeat
           opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
           x: { duration: 20, repeat: Infinity, ease: "easeInOut" }, // Float
           y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
         }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),rgba(255,255,255,0))]" />
      <BackgroundParticles />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl preserve-3d">
        
        {/* System Online Badge */}
        <motion.div
           initial={{ opacity: 0, y: -20, rotateX: 20 }}
           animate={{ opacity: 1, y: 0, rotateX: 0 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-brand-dark text-xs font-bold uppercase tracking-wider mb-8 shadow-sm transform hover:translate-z-10 transition-transform cursor-default"
           style={{ transform: "translateZ(20px)" }}
        >
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-brand-purple'}`} />
          DentiCall System
        </motion.div>

        {/* Headline with 3D Reveal */}
        <div className="relative preserve-3d mb-8">
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-brand-dark leading-tight tracking-tight mb-8 drop-shadow-lg preserve-3d"
            initial={{ opacity: 0, rotateX: -20 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Missed Calls Are Costing Your <br/>
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500 drop-shadow-sm inline-block transform transition-transform duration-500" 
              style={{ transform: "translateZ(30px)" }}
            >
              Dental Clinic Thousands Every Month
            </span>
          </motion.h1>
        </div>

        <motion.p 
          className="text-base md:text-2xl text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed font-medium px-4 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ transform: "translateZ(10px)" }}
        >
         Ai system that captures every call, books patients instantly, and reduces no-shows — without replacing your front desk.
        </motion.p>

        {/* 
            NEW HOLOGRAPHIC GLASS INTERFACE - Visual Only
            Replaces the "Phone Frame". Content is moved out for clickability.
        */}
        <motion.div
           className="relative w-full max-w-[90vw] md:max-w-[360px] h-[450px] mx-auto perspective-container mb-12 will-change-transform gpu-accelerated"
           initial={{ rotateX: 10, opacity: 0 }}
           animate={{ 
               opacity: 1,
               rotateX: 0
           }}
           transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
           style={{ 
               rotateX: isActive ? 0 : tiltX, 
               rotateY: isActive ? 0 : tiltY,
               zIndex: 20
           }}
        >
           {/* The Glass Monolith */}
           <div className="relative w-full h-full preserve-3d">
              
              {/* Glass Card Background */}
              <div 
                  className="absolute inset-0 rounded-[3rem] bg-white/20 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden" 
                  style={{ transform: "translateZ(0px)" }}
              >
                  {/* Subtle Grid Pattern inside Glass */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(139,92,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/5 to-cyan-500/5" />
                  
                  {/* Animated Header Bar inside Glass */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/30 to-transparent flex items-center justify-between px-8 pt-4">
                      <div className="flex items-center gap-2">
                        <Radio size={16} className={`text-brand-purple ${isActive ? 'animate-pulse' : ''}`} />
                        <span className="text-xs font-bold text-brand-purple tracking-widest">LIVE LINK</span>
                      </div>
                      <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40" />
                      </div>
                  </div>
              </div>

              {/* Visual Content Layer - Receptionist Avatar & Status */}
              <div 
                 className="absolute inset-0 flex flex-col items-center justify-center preserve-3d"
                 style={{ transform: "translateZ(30px)" }}
              >
                 {/* The AI Avatar */}
                 <div className="relative mb-0 preserve-3d flex flex-col items-center">
                    <ReceptionistAvatar active={isActive} volume={volume} />
                    
                    {/* Sound Wave Visualizer & Status Text */}
                    <div className="absolute top-[90%] left-0 right-0 flex flex-col items-center justify-center gap-2 transform translate-z-10">
                        <SoundWave active={isActive} volume={volume} />
                        
                        <AnimatePresence>
                             {isActive && (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-brand-purple text-[10px] font-bold tracking-[0.2em] animate-pulse whitespace-nowrap"
                                >
                                    LISTENING...
                                </motion.div>
                             )}
                        </AnimatePresence>
                    </div>
                 </div>

                 {/* Error Message */}
                 <AnimatePresence>
                    {errorMsg && (
                        <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-10 w-[80%] text-xs text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-200 shadow-lg flex items-center justify-center gap-2"
                        >
                           <AlertCircle size={14} className="shrink-0" />
                           <span className="leading-tight">{errorMsg}</span>
                        </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* Floating Decorative Elements orbiting the glass card - Now with Parallax */}
              <motion.div 
                animate={{ 
                    y: [0, -15, 0], 
                    rotateZ: [12, 15, 12],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -right-4 md:-right-12 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-brand-purple border border-gray-100 will-change-transform hidden md:flex gpu-accelerated"
                style={{ 
                    transform: "translateZ(60px)",
                    x: parallaxX, // Parallax movement
                    y: parallaxY
                }}
              >
                 <Calendar size={28} />
              </motion.div>

              <motion.div 
                animate={{ 
                    y: [0, 15, 0], 
                    rotateZ: [-6, -3, -6],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 -left-4 md:-left-10 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-accent-cyan border border-gray-100 will-change-transform hidden md:flex gpu-accelerated"
                style={{ 
                    transform: "translateZ(50px)",
                    x: parallaxXReverse, // Move in opposite direction
                    y: parallaxY
                }}
              >
                 <MessageCircle size={24} />
              </motion.div>

              <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 -left-5 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-md opacity-60 gpu-accelerated"
                style={{ 
                    transform: "translateZ(-20px)",
                    x: parallaxX
                }}
              />

           </div>
        </motion.div>

        {/* BUTTONS CONTAINER - Moved outside 3D card for reliable clickability */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 relative z-50 w-full px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Test Our Booking System */}
          <motion.button
             onClick={handleToggle}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className={`
               group relative w-full md:w-auto px-8 py-4 rounded-full font-bold text-white text-lg shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer overflow-hidden border border-white/20
               ${isActive ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/40' : 'bg-gradient-to-r from-brand-purple to-violet-600 shadow-brand-purple/40'}
             `}
          >
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
               
               {/* Ripple Effect */}
               <AnimatePresence>
                   {isButtonAnimating && (
                     <motion.div 
                       initial={{ scale: 0, opacity: 0.6 }}
                       animate={{ scale: 3, opacity: 0 }}
                       exit={{ opacity: 0 }}
                       className="absolute top-1/2 left-1/2 w-20 h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 mix-blend-overlay"
                       transition={{ duration: 0.6, ease: "easeOut" }}
                     />
                   )}
               </AnimatePresence>

               <span className="relative z-10 flex items-center gap-2 text-base md:text-lg whitespace-nowrap">
                   {status === 'connecting' ? (
                       <><Activity className="animate-spin" size={20} /> Connecting...</>
                   ) : isActive ? (
                       <><MicOff size={20} /> End Session</>
                   ) : (
                       <><Play size={20} fill="currentColor" /> Test our Booking System</>
                   )}
               </span>
          </motion.button>

          {/* Request Demo Button */}
          <button
            onClick={openBookingLink}
            className="w-full md:w-auto px-8 py-4 bg-white border border-gray-300 text-brand-dark font-bold text-lg rounded-full shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl transform hover:-translate-y-1 active:scale-95 cursor-pointer relative z-50 whitespace-nowrap"
          >
            Start Trial Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;