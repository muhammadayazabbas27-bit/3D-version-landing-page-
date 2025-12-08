// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll, MotionValue, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, CheckCircle, Clock, Phone, MessageCircle, MessageSquare, 
  Smartphone, ShieldCheck, Zap, ArrowRight, Gift, Calendar, 
  Calculator, User, Users, Building, Star, ChevronLeft, Snowflake, Bell, Rocket, PlugZap, Bot, Cpu, ScanFace, Network, LayoutGrid, Scan, Split, Database, X
} from 'lucide-react';
import Footer from './Footer';
import ComparisonSection from './ComparisonSection';

interface ChristmasTrialPageProps {
  onBack: () => void;
}

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className = "", depth = 20 }: { children: React.ReactNode, className?: string, depth?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  function onMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = clientX - rect.left - rect.width / 2;
    const yPos = clientY - rect.top - rect.height / 2;
    x.set(xPos);
    y.set(yPos);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-container ${className}`}
    >
      <div style={{ transform: `translateZ(${depth}px)` }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- NEW 3D HOLOGRAM FEATURES (No Scroll Trigger) ---
const HologramFeatures = () => {
  const features = [
    {
      title: "Voice & Chat AI",
      desc: "Intelligent agent that handles simultaneous calls and messages with human-like empathy 24/7.",
      icon: Bot,
      color: "text-cyan-500",
      delay: 0
    },
    {
      title: "WhatsApp & Phone",
      desc: "Unified inbox integration allows the AI to manage appointments via SMS, WhatsApp, and Voice calls instantly.",
      icon: MessageCircle,
      color: "text-blue-500",
      delay: 1.5
    },
    {
      title: "Seamless Integration",
      desc: "Connects flawlessly with your existing Practice Management Software (Dentrix, Eaglesoft, OpenDental).",
      icon: Database,
      color: "text-purple-500",
      delay: 0.5
    },
    {
      title: "Patient Follow-Ups",
      desc: "Automated recall system that personally reaches out to patients due for check-ups to fill your schedule.",
      icon: User,
      color: "text-emerald-500",
      delay: 2
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Ambient Background Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
           <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
             Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Holographic AI</span>
           </h2>
           <p className="text-gray-500">Next-generation capabilities for the modern clinic.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="relative group h-[400px] perspective-container"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Floating Hologram Panel */}
              <motion.div
                className="absolute inset-0 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-cyan-100 shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)] flex flex-col items-center justify-center p-8 text-center transition-all duration-500 overflow-hidden"
                animate={{
                  y: [-10, 10, -10],
                  rotateX: [2, -2, 2],
                  rotateY: [2, -2, 2],
                }}
                transition={{
                  duration: 6 + i, // Slight variation to desynchronize
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: feature.delay
                }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 0,
                  rotateY: 0,
                  y: 0,
                  boxShadow: "0 20px 60px -10px rgba(6,182,212,0.3)",
                  borderColor: "rgba(34,211,238,0.5)"
                }}
              >
                {/* Holographic Scan Line Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-[30%] w-full -translate-y-full group-hover:animate-[scan_2.5s_linear_infinite]" />
                
                {/* Internal Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />

                {/* 3D Icon Container */}
                <div className="relative mb-8 transform-style-3d">
                   <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity" />
                   <div className="relative w-20 h-20 bg-gradient-to-b from-white to-cyan-50 rounded-2xl border border-cyan-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon size={40} className={`${feature.color} drop-shadow-sm`} strokeWidth={1.5} />
                   </div>
                   {/* Orbiting Ring */}
                   <div className="absolute -inset-4 border border-cyan-200/50 rounded-full w-28 h-28 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10 group-hover:text-cyan-700 transition-colors">
                  {feature.title}
                </h3>

                {/* Hidden Benefit Text (Reveals on Hover) */}
                <div className="relative z-10 h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:mt-4">
                   <p className="text-sm text-slate-600 font-medium leading-relaxed">
                     {feature.desc}
                   </p>
                </div>
                
                {/* Default State Subtitle (Visible when not hovering) */}
                <div className="relative z-10 group-hover:opacity-0 group-hover:h-0 transition-all duration-300 mt-2">
                   <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto" />
                </div>

                {/* Glowing Corners */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-cyan-400 opacity-30 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-cyan-400 opacity-30 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-cyan-400 opacity-30 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-cyan-400 opacity-30 group-hover:opacity-100 transition-opacity" />

              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChristmasTrialPage: React.FC<ChristmasTrialPageProps> = ({ onBack }) => {
  const [missedCalls, setMissedCalls] = useState(25);
  const [patientValue, setPatientValue] = useState(200);
  const lostRevenue = missedCalls * patientValue;
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

  // Video State
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  // Mouse Parallax for Details Section
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMouseX((clientX / innerWidth) * 2 - 1);
    setMouseY((clientY / innerHeight) * 2 - 1);
  };

  const openBookingLink = () => {
    window.open('https://cal.com/denticall-ai/15min', '_blank');
  };

  return (
    <div className="font-sans antialiased text-brand-dark bg-white min-h-screen overflow-x-hidden perspective-container">
      
      {/* --- FULLSCREEN VIDEO OVERLAY --- */}
      <AnimatePresence>
        {isVideoExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsVideoExpanded(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsVideoExpanded(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/_ObjxLnrirA?autoplay=1&rel=0&modestbranding=1" 
                title="Denticall Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen 
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div 
            onClick={onBack}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <ChevronLeft size={20} className="text-gray-500" />
            <div className="font-heading font-bold text-lg tracking-tight text-brand-dark">
              Denti<span className="text-[#8b5cf6]">Call</span>
            </div>
          </div>
          <button 
             onClick={openBookingLink}
             className="px-4 py-2 bg-gradient-to-r from-red-500 to-green-600 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
             Start Trial
          </button>
        </div>
      </header>

      {/* --- 1. HERO SECTION --- */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-red-50/20 via-white to-white perspective-container">
        
        {/* --- PREMIUM 3D FESTIVE BACKGROUND --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden preserve-3d" aria-hidden="true">
            {/* Animated Lights & Particles... (Same as before) */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05),transparent_50%)] animate-spin-slow" style={{ animationDuration: '60s' }} />
            <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03),transparent_50%)] animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`dust-${i}`}
                    className={`absolute rounded-full ${i % 2 === 0 ? 'bg-yellow-200' : 'bg-white'}`}
                    initial={{ top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", scale: 0, opacity: 0 }}
                    animate={{ y: [0, -100, 0], x: [0, Math.random() * 50 - 25, 0], scale: [0, Math.random() * 1.5 + 0.5, 0], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
                    style={{ width: Math.random() * 4 + 1 + "px", height: Math.random() * 4 + 1 + "px", filter: "blur(0.5px)" }}
                />
            ))}

            {[...Array(8)].map((_, i) => {
                const assets = [
                    { Icon: Gift, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-200/50" },
                    { Icon: Snowflake, color: "text-cyan-300", bg: "bg-cyan-300/10", border: "border-cyan-200/50" },
                    { Icon: Bell, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-200/50" },
                    { Icon: Star, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-200/50" }
                ];
                const asset = assets[i % assets.length];
                const depth = Math.random() * 100 - 20;
                return (
                    <motion.div
                        key={`orb-${i}`}
                        className={`absolute flex items-center justify-center rounded-full backdrop-blur-sm border shadow-lg preserve-3d ${asset.bg} ${asset.border}`}
                        style={{
                            width: `${Math.random() * 60 + 40}px`,
                            height: `${Math.random() * 60 + 40}px`,
                            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.05)`,
                            transform: `translateZ(${depth}px)`
                        }}
                        initial={{ top: "120%", left: `${Math.random() * 90}%`, rotateX: Math.random() * 360, rotateY: Math.random() * 360 }}
                        animate={{ top: "-20%", rotateX: [0, 360], rotateY: [0, 360], y: [0, -20, 0] }}
                        transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: i * 2 }}
                    >
                        <asset.Icon size={24} className={`${asset.color} drop-shadow-md`} strokeWidth={1.5} />
                        <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white/40 rounded-full blur-[2px]" />
                    </motion.div>
                )
            })}
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-400/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-400/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
        
        <div className="container mx-auto px-6 relative z-10 preserve-3d">
          
          {/* 
             VIDEO TRIGGER CONTAINER:
             Premium 3D Frame acting as a button.
          */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             style={{
                position: "relative",
                width: "100%",
                height: "600px",
                marginTop: "20px",
                perspective: "1000px"
             }}
          >
              <TiltCard depth={0}>
                <div 
                  className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white bg-black transform-style-3d cursor-pointer group"
                  onClick={() => setIsVideoExpanded(true)}
                >
                    {/* YouTube Thumbnail */}
                    <img 
                        src="https://img.youtube.com/vi/_ObjxLnrirA/maxresdefault.jpg" 
                        alt="Dashboard Preview" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-center p-6 backdrop-blur-[1px] transition-all duration-500 group-hover:backdrop-blur-none group-hover:bg-black/40">
                        
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-6 group-hover:bg-white/30 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all"
                        >
                            <Play size={40} className="text-white fill-white ml-1" />
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                            Never Miss a Patient Again
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 font-medium drop-shadow-md">
                            AI Communication System: Voice, Chat, WhatsApp & Phone<br />
                            — All in One Platform.
                        </p>
                        <p className="text-base md:text-lg text-yellow-300 font-bold mb-8 uppercase tracking-widest drop-shadow-sm">
                            Try it this Christmas for 100 Minutes Free!
                        </p>
                        
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                openBookingLink();
                            }}
                            className="px-10 py-4 bg-[#0070f3] text-white font-bold text-lg rounded-xl shadow-[0_10px_30px_rgba(0,112,243,0.4)] hover:bg-[#0060df] hover:scale-105 transition-all active:scale-95 border border-white/10"
                        >
                            Claim 100-Minute Trial → No credit card required
                        </button>
                    </div>
                </div>
              </TiltCard>
          </motion.div>

        </div>
      </section>

      {/* --- 2. CHRISTMAS TRIAL DETAILS (PREMIUM 3D MIDNIGHT THEME) --- */}
      <section 
        className="relative py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#2a0a18] to-slate-950 perspective-container"
        onMouseMove={handleMouseMove}
      >
        
        {/* --- PREMIUM 3D ANIMATED BACKGROUND --- */}
        <div className="absolute inset-0 pointer-events-none">
            
            {/* 1. Large Abstract 3D Ornaments (Parallax) */}
            <motion.div 
               className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-600/20 to-purple-900/40 blur-[80px] mix-blend-screen"
               animate={{ 
                   x: mouseX * -40, 
                   y: mouseY * -40,
                   scale: [1, 1.1, 1]
               }}
               transition={{ scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
            />
            <motion.div 
               className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-600/10 to-teal-900/30 blur-[80px] mix-blend-screen"
               animate={{ 
                   x: mouseX * -60, 
                   y: mouseY * -60,
                   scale: [1.1, 1, 1.1]
               }}
               transition={{ scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
            />
            
            {/* 2. Golden Stardust (Sparkles) */}
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-yellow-200 shadow-[0_0_10px_#fcd34d]"
                    style={{ width: Math.random() * 3 + 1 + "px", height: Math.random() * 3 + 1 + "px", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.5 + 0.3 }}
                    animate={{ y: [0, -50, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                    transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 2 }}
                />
            ))}
            
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 preserve-3d">
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 border border-yellow-500/30 mb-8 backdrop-blur-md shadow-[0_0_25px_rgba(234,179,8,0.2)]"
           >
             <Clock size={16} className="text-yellow-400" /> 
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-bold tracking-widest uppercase text-xs">Limited Time Offer</span>
           </motion.div>

           <motion.h2 
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl font-bold mb-16 text-white drop-shadow-xl"
           >
             Why Test DentiCall <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">This Christmas?</span>
           </motion.h2>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 perspective-container relative">
              {/* --- 3D CONNECTING LINE --- */}
              <div className="hidden md:block absolute top-[6rem] left-[15%] right-[15%] h-[2px] bg-white/10 rounded-full -z-10 preserve-3d pointer-events-none" style={{ transform: "translateZ(-20px)" }}>
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-yellow-400 opacity-80 rounded-full box-shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                  />
              </div>

              {[
                { icon: Clock, title: "100 Free Minutes", desc: "Test AI voice & chat handling risk-free.", color: "text-cyan-300", bg: "from-cyan-900/40 to-cyan-800/10", border: "group-hover:border-cyan-400/50" },
                { icon: Smartphone, title: "Zero Friction", desc: "Connects with your existing phone & WhatsApp.", color: "text-purple-300", bg: "from-purple-900/40 to-purple-800/10", border: "group-hover:border-purple-400/50" },
                { icon: Zap, title: "Real-Time Results", desc: "See patient responses instantly in your dashboard.", color: "text-yellow-300", bg: "from-yellow-900/40 to-yellow-800/10", border: "group-hover:border-yellow-400/50" }
              ].map((item, i) => (
                <TiltCard key={i} className="h-full">
                  <div className={`h-full bg-gradient-to-b ${item.bg} backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 flex flex-col items-center group ${item.border} relative overflow-hidden`}>
                     {/* Glass Sheen */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-50" />
                     <div className={`w-20 h-20 rounded-2xl bg-white/5 border border-white/10 ${item.color} flex items-center justify-center mb-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500 relative`} style={{ transform: "translateZ(30px)" }}>
                       {/* @ts-ignore */}
                       <item.icon size={36} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                       <div className={`absolute inset-0 ${item.color.replace('text-', 'bg-')}/20 blur-xl rounded-full`} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-white tracking-wide" style={{ transform: "translateZ(20px)" }}>{item.title}</h3>
                     <p className="text-gray-300 leading-relaxed text-base font-light" style={{ transform: "translateZ(10px)" }}>{item.desc}</p>
                  </div>
                </TiltCard>
              ))}
           </div>

           <button 
             onClick={openBookingLink}
             className="relative px-12 py-5 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-xl rounded-full shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105 transition-all active:scale-95 border border-red-400/30 overflow-hidden group"
           >
             <span className="relative z-10 flex items-center gap-3">
               Start Your Trial Today <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </span>
             {/* Shine Effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-in-out]" />
           </button>
           
           <p className="mt-8 text-sm text-yellow-500/80 uppercase tracking-widest font-semibold drop-shadow-md">
             Offer ends Dec 31st
           </p>
        </div>
      </section>

      {/* --- 3. ROI CALCULATOR & PAIN POINTS --- */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
             
             {/* Stats / Pain Points */}
             <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                  You could be losing <br/><span className="text-red-500">revenue every day.</span>
                </h2>
                <p className="text-xl text-gray-500 mb-10">
                  Here is how AI plugs the leaks in your dental practice.
                </p>

                <div className="space-y-8">
                   {[
                     { label: "Missed Calls", val: "30%", color: "bg-red-500", w: "30%" },
                     { label: "Lost Revenue", val: "$200k+", color: "bg-orange-500", w: "70%" },
                     { label: "No-Show Rate", val: "20%", color: "bg-yellow-500", w: "20%" },
                   ].map((stat, i) => (
                     <div key={i}>
                        <div className="flex justify-between mb-3 font-bold text-gray-700 text-lg">
                          <span>{stat.label}</span>
                          <span className="text-brand-dark">{stat.val}</span>
                        </div>
                        <div className="h-5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: stat.w }}
                             viewport={{ once: true }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className={`h-full ${stat.color} rounded-full relative`} 
                           >
                             <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                           </motion.div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Interactive Calculator - Glassmorphism */}
             <div className="flex-1 w-full max-w-md perspective-container">
                <TiltCard depth={10}>
                  <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-bl-[100px]" />
                    
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div className="p-4 bg-brand-purple/10 rounded-2xl text-brand-purple">
                        <Calculator size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-dark">Revenue Loss Calculator</h3>
                    </div>

                    <div className="space-y-8 relative z-10">
                      <div>
                        <div className="flex justify-between mb-3">
                            <label className="text-sm font-bold text-gray-600">Avg. Missed Calls / Month</label>
                            <span className="font-bold text-brand-purple bg-brand-purple/5 px-2 py-1 rounded">{missedCalls}</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" value={missedCalls} 
                          onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-3">
                            <label className="text-sm font-bold text-gray-600">Avg. Patient Value</label>
                            <span className="font-bold text-brand-purple bg-brand-purple/5 px-2 py-1 rounded">${patientValue}</span>
                        </div>
                        <input 
                          type="range" min="50" max="1000" step="50" value={patientValue} 
                          onChange={(e) => setPatientValue(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                        />
                      </div>
                      
                      <div className="pt-8 border-t border-gray-100 text-center">
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-2">Potential Monthly Loss</p>
                          <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                            ${lostRevenue.toLocaleString()}
                          </div>
                      </div>

                      <button 
                        onClick={openBookingLink}
                        className="w-full py-4 bg-brand-dark text-white font-bold text-lg rounded-xl hover:bg-black transition-all hover:shadow-lg transform active:scale-95"
                      >
                        Stop Losing Money →
                      </button>
                    </div>
                  </div>
                </TiltCard>
             </div>

          </div>
        </div>
      </section>

      {/* --- 4. FEATURES (NEW HOLOGRAM STYLE - NO SCROLL TRIGGER) --- */}
      <HologramFeatures />

      {/* --- 5. PERSONAS (Who is this for?) --- */}
      <section className="py-24 bg-brand-purple/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark">Built for Every Practice Size</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto perspective-container">
             {[
               { icon: User, title: "Solo Dentists", sub: "Automate reception." },
               { icon: Users, title: "Growing Clinics", sub: "Handle overflow." },
               { icon: Building, title: "Groups / DSOs", sub: "Centralize control." }
             ].map((p, i) => (
               <TiltCard key={i}>
                  <div className="bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100 hover:border-brand-purple/30 transition-colors h-full flex flex-col items-center justify-center">
                      {/* @ts-ignore */}
                      <p.icon size={48} className="mx-auto text-brand-purple/40 mb-6" />
                      <h3 className="font-bold text-2xl mb-2">{p.title}</h3>
                      <p className="text-gray-500">{p.sub}</p>
                  </div>
               </TiltCard>
             ))}
          </div>
        </div>
      </section>

      {/* --- NEW COMPARISON SECTION --- */}
      <ComparisonSection />

      {/* --- 6. PROCESS (3D ENHANCED) --- */}
      <section className="py-32 bg-white relative overflow-hidden perspective-container">
         <div className="container mx-auto px-6 relative z-10">
            <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-5xl font-bold text-center mb-24 text-brand-dark"
            >
               Get Started in <span className="text-brand-purple">3 Steps</span>
            </motion.h2>

            <div className="relative max-w-6xl mx-auto perspective-container">
               {/* 3D Animated Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-0 w-full h-4 -z-10 preserve-3d" style={{ transform: "translateZ(-20px)" }}>
                 {/* Track */}
                 <div className="absolute inset-0 bg-gray-100 rounded-full shadow-inner" />
                 {/* Progress Beam */}
                 <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-brand-purple via-red-500 to-green-500 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 preserve-3d">
                  {[
                    { num: "1", title: "Sign Up for Trial", desc: "Claim your 100 free minutes.", icon: Gift, color: "from-red-500 to-red-600" },
                    { num: "2", title: "Quick Integration", desc: "Connect phone & WhatsApp.", icon: PlugZap, color: "from-green-500 to-emerald-600" },
                    { num: "3", title: "Go Live", desc: "AI handles your patients.", icon: Rocket, color: "from-blue-500 to-cyan-600" }
                  ].map((step, i) => (
                    <TiltCard key={i} className="h-full" depth={10}>
                       <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col items-center text-center h-full group relative overflow-hidden">
                          {/* 3D Floating Orb for Number */}
                          <div 
                            className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} text-white font-bold text-4xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-[6px] border-white relative z-10 group-hover:scale-110 transition-transform duration-500`}
                            style={{ transform: "translateZ(30px)" }}
                          >
                            {/* Inner Icon replaces number on hover if desired, or sits above? Let's just keep number but float icon above */}
                            {step.num}
                            
                            {/* Floating 3D Icon Badge */}
                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-md">
                               <step.icon size={20} />
                            </div>

                            {/* Glowing Ring */}
                            <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_10s_linear_infinite]" />
                          </div>
                          
                          {/* Content */}
                          <h3 className="font-bold text-2xl mb-4 text-brand-dark" style={{ transform: "translateZ(20px)" }}>{step.title}</h3>
                          <p className="text-gray-500 text-lg leading-relaxed" style={{ transform: "translateZ(10px)" }}>{step.desc}</p>
                          
                          {/* Festive Decoration */}
                          <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                       </div>
                    </TiltCard>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* --- 7. FINAL CTA --- */}
      <section className="py-32 bg-gradient-to-br from-brand-purple to-violet-700 text-white text-center relative overflow-hidden perspective-container">
         
         {/* 3D Floating Particles */}
         <div className="absolute inset-0 preserve-3d">
            {[...Array(10)].map((_, i) => (
                <motion.div 
                    key={i}
                    className="absolute bg-white/10 rounded-full blur-xl"
                    style={{ 
                        left: Math.random() * 100 + "%", 
                        top: Math.random() * 100 + "%", 
                        width: Math.random() * 200 + 50, 
                        height: Math.random() * 200 + 50,
                        transform: `translateZ(${Math.random() * 50}px)`
                    }}
                    animate={{ y: [0, -50, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 10 + Math.random() * 10, repeat: Infinity }}
                />
            ))}
         </div>

         <div className="container mx-auto px-6 relative z-10 preserve-3d">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
                style={{ transform: "translateZ(30px)" }}
            >
                Start Your Trial — <span className="text-yellow-300">Only 100 Minutes Available</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{ transform: "translateZ(20px)" }}
            >
              Join other clinics already testing AI and see results in days. No credit card required, no commitment.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               style={{ transform: "translateZ(40px)" }}
            >
                <button 
                    onClick={openBookingLink}
                    className="px-12 py-6 bg-white text-brand-purple font-bold text-xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-gray-50 hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto"
                >
                    Start Trial Now <ArrowRight />
                </button>
            </motion.div>

            <div className="mt-12 flex justify-center gap-8 text-base text-purple-200 font-medium" style={{ transform: "translateZ(10px)" }}>
               <span className="flex items-center gap-2"><CheckCircle size={20} className="text-green-400" /> Instant Setup</span>
               <span className="flex items-center gap-2"><CheckCircle size={20} className="text-green-400" /> Cancel Anytime</span>
            </div>
         </div>
      </section>

      {/* Re-use Main Footer */}
      <Footer />
    </div>
  );
};

export default ChristmasTrialPage;