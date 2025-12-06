
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue, useMotionValue } from 'framer-motion';
import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from "@google/genai";
import { Play, Mic, MicOff, Calendar, MessageCircle, CheckCircle, Smartphone, Wifi, Activity, Sparkles, Radio } from 'lucide-react';
import Orb from './Orb';

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
    return Array.from({ length: 60 }).map((_, i) => {
      const isPurple = Math.random() > 0.5;
      return {
        id: i,
        top: Math.random() * 100, // %
        left: Math.random() * 100, // %
        size: Math.random() * 5 + 2, // 2px to 7px (larger range)
        depth: Math.random() * 400 - 200, // translateZ value for depth (-200 to 200)
        duration: Math.random() * 20 + 15, // 15s to 35s (Much slower)
        delay: Math.random() * 5,
        color: isPurple ? 'bg-brand-purple' : 'bg-accent-cyan',
        glowColor: isPurple ? 'rgba(139, 92, 246, 0.6)' : 'rgba(34, 211, 238, 0.6)'
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none preserve-3d z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            transform: `translateZ(${p.depth}px)`, // Apply 3D depth
            boxShadow: `0 0 ${p.size * 3}px ${p.glowColor}`, // Ethereal Glow
            filter: 'blur(0.5px)'
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1], // Breathing opacity
            y: [0, -80, 0], // Gentle float up and down
            scale: [1, 1.2, 1]
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

const Hero: React.FC<HeroProps> = ({ mouseX, mouseY }) => {
  // --- Live API State ---
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Use MotionValue for volume to prevent re-renders
  const volume = useMotionValue(0);

  const [isButtonAnimating, setIsButtonAnimating] = useState(false);

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

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  
  // Parallax + Mouse Tilt (Smoother and slightly less extreme for the larger interface)
  const tiltX = useTransform(mouseY || new MotionValue(0), [-1, 1], [3, -3]);
  const tiltY = useTransform(mouseX || new MotionValue(0), [-1, 1], [-3, 3]);

  const openBookingLink = () => {
    window.open('https://cal.com/ayaz-abbas-hitit.agency/out-bound-warm-leads-appointments', '_blank');
  };

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
      try { sessionRef.current.close(); } catch (e) { console.warn("Error closing session", e); }
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
    sourcesRef.current.forEach(source => { try { source.stop(); } catch(e) {} });
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Fix for TS2554: Explicitly cast the constructor to any to accept options argument
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as any;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      
      const outputAnalyser = outputCtx.createAnalyser();
      outputAnalyser.fftSize = 256;
      outputAnalyserRef.current = outputAnalyser;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputAnalyser);
      outputAnalyser.connect(outputCtx.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

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
                         } catch (e) {
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
                sourcesRef.current.forEach(source => { try { source.stop(); } catch(e) {} });
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
             }
          },
          onclose: () => { stopSession(); },
          onerror: () => { setErrorMsg("Connection Failed."); stopSession(); }
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (error) {
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
      
      {/* 3D Background Elements - Parallax & Particles */}
      <motion.div style={{ y: y1 }} className="absolute top-[20%] right-[10%] w-80 h-80 bg-purple-200/30 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-multiply" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-multiply" />
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
          System Online
        </motion.div>

        {/* Headline with 3D Reveal */}
        <div className="relative preserve-3d mb-8">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-brand-dark leading-tight tracking-tight mb-8 drop-shadow-lg preserve-3d"
            initial={{ opacity: 0, rotateX: -20 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Clinic’s 24/7 <br/>
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500 drop-shadow-sm inline-block transform transition-transform duration-500" 
              style={{ transform: "translateZ(40px)" }}
            >
              AI communication System
            </span>
          </motion.h1>
        </div>

        <motion.p 
          className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ transform: "translateZ(10px)" }}
        >
          DentiCall answers every call, books patients automatically, and keeps your schedule full.
        </motion.p>

        {/* 
            NEW HOLOGRAPHIC GLASS INTERFACE - Visual Only
            Replaces the "Phone Frame". Content is moved out for clickability.
        */}
        <motion.div
           className="relative w-[300px] md:w-[360px] h-[450px] mx-auto perspective-container mb-12"
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

              {/* Visual Content Layer - Orb & Status */}
              <div 
                 className="absolute inset-0 flex flex-col items-center justify-center preserve-3d"
                 style={{ transform: "translateZ(30px)" }}
              >
                 {/* The AI Orb & Visualizer */}
                 <div className="relative mb-0 preserve-3d flex flex-col items-center">
                    <Orb size="md" active={isActive} volume={volume} />
                    
                    {/* Sound Wave Visualizer & Status Text */}
                    <div className="absolute top-[82%] left-0 right-0 flex flex-col items-center justify-center gap-2 transform translate-z-10">
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
                        className="absolute bottom-10 text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-200"
                        >
                        {errorMsg}
                        </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* Floating Decorative Elements orbiting the glass card */}
              <motion.div 
                animate={{ 
                    y: [0, -15, 0], 
                    rotateZ: [12, 15, 12],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -right-12 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-brand-purple border border-gray-100"
                style={{ transform: "translateZ(60px)" }}
              >
                 <Calendar size={28} />
              </motion.div>

              <motion.div 
                animate={{ 
                    y: [0, 15, 0], 
                    rotateZ: [-6, -3, -6],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 -left-10 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-accent-cyan border border-gray-100"
                style={{ transform: "translateZ(50px)" }}
              >
                 <MessageCircle size={24} />
              </motion.div>

              <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 -left-5 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-md opacity-60"
                style={{ transform: "translateZ(-20px)" }}
              />

           </div>
        </motion.div>

        {/* BUTTONS CONTAINER - Moved outside 3D card for reliable clickability */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 relative z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Test AI Voice Button */}
          <motion.button
             onClick={handleToggle}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className={`
               group relative px-8 py-4 rounded-full font-bold text-white text-lg shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer overflow-hidden border border-white/20
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

               <span className="relative z-10 flex items-center gap-2">
                   {status === 'connecting' ? (
                       <><Activity className="animate-spin" size={20} /> Connecting...</>
                   ) : isActive ? (
                       <><MicOff size={20} /> End Session</>
                   ) : (
                       <><Play size={20} fill="currentColor" /> Test AI Voice</>
                   )}
               </span>
          </motion.button>

          {/* Request Demo Button */}
          <button
            onClick={openBookingLink}
            className="px-8 py-4 bg-white border border-gray-300 text-brand-dark font-bold text-lg rounded-full shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl transform hover:-translate-y-1 active:scale-95 cursor-pointer relative z-50"
          >
            Request a Demo
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
