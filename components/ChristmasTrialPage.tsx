// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll, MotionValue, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, CheckCircle, Clock, Phone, MessageCircle, MessageSquare, 
  Smartphone, ShieldCheck, Zap, ArrowRight, Gift, Calendar, 
  Calculator, User, Users, Building, Star, ChevronLeft, Snowflake, Bell, Rocket, PlugZap, Bot, Cpu, ScanFace, Network, LayoutGrid, Scan, Split, Database, X, Users2, AlertTriangle, PhoneOff, UserX, XCircle, CheckCircle2, Globe, Mic, TrendingDown, Activity, DollarSign, CalendarCheck, TrendingUp
} from 'lucide-react';
import Footer from './Footer';
import MindsBehind from './MindsBehind';
import Testimonials from './Testimonials';

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
      className={`relative perspective-container will-change-transform ${className}`}
    >
      <div style={{ transform: `translateZ(${depth}px)` }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- NEW 3D HOLOGRAM FEATURES (No Scroll Trigger) ---
const HologramFeatures = () => {
  // ... (No changes to HologramFeatures needed for this request, but keeping function for context if reused)
  return null; 
};

const ChristmasTrialPage: React.FC<ChristmasTrialPageProps> = ({ onBack }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

  // Video State
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  // ROI Calculator State
  const [missedCallsInput, setMissedCallsInput] = useState(15);
  const [patientValueInput, setPatientValueInput] = useState(500);
  
  // Calculate Annual Loss
  const monthlyLoss = missedCallsInput * patientValueInput;
  const annualLoss = monthlyLoss * 12;

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

  const fullSystemModules = [
    {
      icon: PhoneOff,
      title: "Stop Losing $200k+ (Missed Calls)",
      body: "The Full System answers calls, WhatsApps, and messages 24/7. It captures every lead the trial might miss.",
      stat: "Clients recover $200k/year avg.",
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      icon: CalendarCheck,
      title: "Boost Bookings by 30%",
      body: "Complete integration means real-time booking, rescheduling, and cancellations directly in your software.",
      stat: "Fully automated schedule filling.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: UserX,
      title: "Eliminate No-Shows",
      body: "Automated multi-channel reminders (SMS, Email, Voice) ensure patients show up. (Not included in trial).",
      stat: "Cut no-shows by 40%.",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: TrendingUp,
      title: "Increase Treatment Acceptance",
      body: "Smart follow-ups educate patients on procedures, driving higher-value bookings automatically.",
      stat: "25% more 'Yes' to treatment.",
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      icon: Clock,
      title: "Save 16+ Staff Hours/Week",
      body: "Full CRM integration automates admin tasks, freeing your team completely to focus on care.",
      stat: "Your team gets 2 days back.",
      color: "text-brand-purple",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="font-sans antialiased text-brand-dark bg-white min-h-screen overflow-x-hidden perspective-container">
      
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

      {/* --- 1. HERO SECTION (Unchanged) --- */}
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 relative overflow-hidden bg-gradient-to-b from-red-50/10 via-white to-white perspective-container">
         {/* ... Hero Background ... */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-br from-brand-purple/5 to-transparent blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-accent-cyan/5 to-transparent blur-3xl opacity-50" />
            {[...Array(15)].map((_, i) => (
                <div key={i} className="absolute bg-brand-purple/10 rounded-full" style={{ width: Math.random() * 4 + 2, height: Math.random() * 4 + 2, top: Math.random() * 100 + '%', left: Math.random() * 100 + '%' }} />
            ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            {/* Left Content */}
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-6">
                   <Gift size={14} /> Christmas Special
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-brand-dark leading-tight mb-4 md:mb-6 tracking-tight">
                  Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-600">Patient Again.</span>
                </h1>
                <p className="text-base md:text-xl text-gray-500 mb-8 md:mb-10 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                  AI Communication System: Voice, Chat, Follow-up, Reminders, WhatsApp, Social Bot & Phone — <span className="text-brand-dark font-semibold">All in One Place.</span>
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                  <button onClick={openBookingLink} className="w-full sm:w-auto px-8 py-4 bg-brand-dark text-white font-bold text-lg rounded-full shadow-lg shadow-brand-dark/20 hover:bg-black hover:scale-105 transition-all flex items-center justify-center gap-2">
                    Claim 7-days Free Trial <ArrowRight size={20} />
                  </button>
                  <p className="text-sm text-gray-400 font-medium">No credit card required</p>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-500 font-medium">
                   <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                          </div>
                      ))}
                   </div>
                   <span>Join forward-thinking clinics</span>
                </div>
              </motion.div>
            </div>
            {/* Right Video */}
            <div className="w-full lg:w-2/5">
                <AnimatePresence>
                    {isVideoExpanded && (
                        <motion.div layoutId="hero-video-container" className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10" onClick={() => setIsVideoExpanded(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => setIsVideoExpanded(false)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"><X size={24} /></button>
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src="https://www.youtube.com/embed/1rxQAdpLN8U" 
                                    title="What you will Get ?" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen 
                                    className="w-full h-full" 
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isVideoExpanded && (
                    <motion.div layoutId="hero-video-container" className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 cursor-pointer group" onClick={() => setIsVideoExpanded(true)} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        <img src="https://img.youtube.com/vi/1rxQAdpLN8U/maxresdefault.jpg" alt="Dashboard Preview" className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play size={32} className="text-brand-purple fill-brand-purple ml-1" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE PROBLEM --- */}
      <section className="py-20 bg-white relative overflow-hidden perspective-container">
        {/* Background Accents */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
           
           <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
               <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight"
               >
                 Are You Losing Money <span className="text-red-500">Without Knowing It?</span>
               </motion.h2>
               <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                 Most dental clinics miss 3 out of every 10 calls. That means losing patients and revenue every single day.
               </p>
             </div>

             {/* The "Revenue Leak" Report Card */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
             >
                {/* Header Strip */}
                <div className="h-2 w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                   {/* Left: Key Metrics */}
                   <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                         <Activity size={16} /> Daily Operations
                      </h3>
                      
                      <div className="space-y-8">
                         <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                               <PhoneOff size={24} />
                            </div>
                            <div>
                               <div className="text-4xl font-bold text-brand-dark mb-1">30%</div>
                               <div className="text-sm text-gray-500 font-medium">of calls get missed completely</div>
                            </div>
                         </div>
                         
                         <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                               <UserX size={24} />
                            </div>
                            <div>
                               <div className="text-4xl font-bold text-brand-dark mb-1">20%</div>
                               <div className="text-sm text-gray-500 font-medium">of patients don't show up</div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Right: The Cost Impact */}
                   <div className="p-8 md:p-10 flex flex-col justify-center bg-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none" />
                      
                      <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold mb-6">
                             <AlertTriangle size={14} /> Annual Impact
                          </div>
                          
                          <h3 className="text-xl text-gray-600 mb-2 font-medium">Potential Lost Revenue</h3>
                          <div className="text-5xl md:text-6xl font-bold text-brand-dark mb-6 tracking-tight">
                            $100k<span className="text-red-500">+</span>
                          </div>
                          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                             This silent leak affects practice growth, staff morale, and patient satisfaction. Don't let it continue another year.
                          </p>
                          
                          <button 
                             onClick={openBookingLink}
                             className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl shadow-lg hover:bg-black hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                          >
                             Stop Losing Money <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                      </div>
                   </div>
                </div>
             </motion.div>
           </div>

        </div>
      </section>

      {/* --- SECTION 3: SPECIAL CHRISTMAS OFFER (WHITE & 3D FLOATING) --- */}
      <section className="py-24 bg-white relative overflow-hidden" onMouseMove={handleMouseMove}>
         {/* Background Patterns - Subtle Grid */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         
         {/* --- NEW 3D FLOATING CHRISTMAS OBJECTS (Auto-Animated) --- */}
         <div className="absolute inset-0 pointer-events-none z-0">
             {[...Array(15)].map((_, i) => {
                const assets = [
                  { type: 'icon', Icon: Gift, color: 'text-red-500', glow: 'rgba(239,68,68,0.2)' },
                  { type: 'icon', Icon: Snowflake, color: 'text-cyan-400', glow: 'rgba(34,211,238,0.2)' },
                  { type: 'emoji', content: '🎅', glow: 'rgba(200,200,200,0.2)' },
                  { type: 'icon', Icon: Bell, color: 'text-yellow-500', glow: 'rgba(234,179,8,0.2)' },
                  { type: 'emoji', content: '🎄', glow: 'rgba(34,197,94,0.2)' },
                  { type: 'icon', Icon: Star, color: 'text-amber-400', glow: 'rgba(251,191,36,0.2)' }
                ];
                const asset = assets[i % assets.length];
                
                return (
                   <motion.div 
                      key={`float-3d-${i}`} 
                      className={`absolute flex items-center justify-center ${asset.type === 'icon' ? asset.color : ''} gpu-accelerated`}
                      style={{ 
                         left: `${Math.random()*90}%`, 
                         top: "100%",
                         filter: `drop-shadow(0 0 5px ${asset.glow})`
                      }}
                      initial={{ 
                         y: 0,
                         rotateX: 0,
                         rotateY: 0,
                         scale: 0.9
                      }}
                      animate={{ 
                         y: "-120vh",
                         rotateX: [0, 15, 0],
                         rotateY: [0, 360],
                         scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{ 
                         duration: 10 + Math.random()*10, 
                         repeat: Infinity, 
                         ease: "linear",
                         delay: i * 0.8 
                      }}
                   >
                      {asset.type === 'icon' ? (
                        <asset.Icon size={Math.random() * 30 + 30} strokeWidth={1.5} />
                      ) : (
                        <span style={{ fontSize: `${Math.random() * 30 + 30}px` }}>{asset.content}</span>
                      )}
                   </motion.div>
                );
             })}
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-purple/5 border border-brand-purple/20 text-brand-purple mb-6 shadow-sm">
                  <Gift size={18} className="text-brand-purple fill-brand-purple/20" />
                  <span className="font-bold uppercase text-xs tracking-widest">Limited Time Offer</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brand-dark drop-shadow-sm">🎁 Santa’s Special Gift: <br/> A "Test Drive" of Your AI Helper</h2>
               <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
                  This is NOT the full system. Think of it like a free "test drive" for a new car. 
                  For Christmas, we are letting you try the basic version of our AI for FREE. You get 7-days to see how it works.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 perspective-container">
               
               {/* What You Get - Frosty Emerald Theme */}
               <TiltCard>
                   <div className="bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group h-full">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10" />
                      <h3 className="text-2xl font-bold text-emerald-600 mb-8 flex items-center gap-3">
                         <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle size={28} /></div> 
                         In Your Free Test Drive
                      </h3>
                      <ul className="space-y-4">
                         {[
                            "An AI that can answer phone calls (Voice) and book only",
                            "A dashboard with dentiCall branding",
                            "See agent activities, call logs and usage",
                            "Custom setup",
                            "Help setting it up with your clinic's phone number",
                            "Only Booking software integration",
                            "Human transfer"
                         ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                               <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-1" />
                               <span>{item}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
               </TiltCard>

               {/* What You Don't Get - Slate/Red Theme */}
               <TiltCard>
                   <div className="bg-gray-50/80 backdrop-blur-xl border border-gray-200 rounded-[2rem] p-8 shadow-inner relative overflow-hidden h-full">
                      <h3 className="text-2xl font-bold text-gray-500 mb-8 flex items-center gap-3">
                         <div className="p-2 bg-gray-200 rounded-lg"><XCircle size={28} className="text-red-400" /></div>
                         NOT Included <span className="text-xs font-normal text-gray-400 ml-auto border border-gray-300 px-2 py-1 rounded bg-white">Full System Only</span>
                  </h3>
                      <ul className="space-y-4">
                         {[
                            "No WhatsApp or Facebook messages",
                            "No automatic appointment reminders & follow-ups",
                            "No website widget",
                            "No Emergency handling",
                            "Not all integrations available",
                            "No reschedule & cancellation",
                            "No custom branded Dashboard",
                            "No Insurance verification"
                         ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-400">
                               <X size={18} className="text-red-300 shrink-0 mt-1" />
                               <span>{item}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
               </TiltCard>
            </div>

            <div className="text-center">
               <button 
                  onClick={openBookingLink}
                  className="px-12 py-5 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold text-xl rounded-full shadow-[0_10px_40px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_50px_rgba(220,38,38,0.5)] hover:scale-105 transition-all border border-red-400/20"
               >
                  Start Your Free 7-days Test Drive →
               </button>
               <p className="mt-6 text-sm text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Bell size={14} className="text-red-400 fill-red-400" /> Offer ends Dec 31st <Bell size={14} className="text-red-400 fill-red-400" />
               </p>
            </div>
         </div>
      </section>
      
      {/* --- NEW SECTION: ROI CALCULATOR --- */}
      <section className="py-24 bg-brand-gray/30 relative overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Calculate Your Hidden Revenue Potential</h2>
               <p className="text-gray-500">See exactly how much revenue you could reclaim.</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left: Context */}
                <div className="space-y-6">
                   <h3 className="text-2xl font-bold text-brand-dark">Every missed call is a missed opportunity.</h3>
                   <p className="text-gray-600 leading-relaxed">
                      Small leaks sink big ships. Even missing just 10 calls a month can add up to massive losses over a year when you factor in lifetime patient value.
                   </p>
                   <ul className="space-y-3">
                      {[
                        "Average new patient value is often underestimated.",
                        "Missed calls rarely call back.",
                        "A single booking covers the cost of AI."
                      ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-brand-dark font-medium">
                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                            {item}
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Right: Calculator Card */}
                <TiltCard>
                   <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full" />
                       
                       <div className="relative z-10 space-y-8">
                          {/* Input 1 */}
                          <div>
                             <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Missed Calls / Month</label>
                                <span className="text-brand-purple font-bold bg-brand-purple/10 px-2 py-1 rounded">{missedCallsInput}</span>
                             </div>
                             <input 
                               type="range" min="1" max="50" step="1" 
                               value={missedCallsInput} 
                               onChange={(e) => setMissedCallsInput(parseInt(e.target.value))}
                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                             />
                          </div>

                          {/* Input 2 */}
                          <div>
                             <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Avg. Patient Value</label>
                                <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">${patientValueInput}</span>
                             </div>
                             <input 
                               type="range" min="100" max="2000" step="50" 
                               value={patientValueInput} 
                               onChange={(e) => setPatientValueInput(parseInt(e.target.value))}
                               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                             />
                          </div>

                          {/* Result */}
                          <div className="pt-8 border-t border-gray-100 text-center">
                              <p className="text-gray-400 font-medium mb-1">Annual Lost Revenue</p>
                              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 animate-pulse">
                                ${annualLoss.toLocaleString()}
                              </div>
                          </div>

                          <button 
                             onClick={openBookingLink}
                             className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                          >
                             <DollarSign size={18} /> Reclaim This Revenue
                          </button>
                       </div>
                   </div>
                </TiltCard>

            </div>
         </div>
      </section>

      {/* --- SECTION 4: HOW THE FREE TEST WORKS --- */}
      <section className="py-24 bg-white relative">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Get Started in Just 2 Easy Steps</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gray-100 -z-10 -translate-y-1/2" />

               {[
                  { step: "1", title: "Talk to Us (30-Min)", desc: "We hop on a call with you. You tell us about your clinic and your agent style. We will custom set up your AI trial system just for you. It will be ready in 24 hours.", icon: Phone },
                  { step: "2", title: "Try It Yourself", desc: "We give you a login. You can talk to your own AI, see how it works, and test it. If you like it, great! If not, no problem.We will make changes & then we can give it to you.", icon: Rocket }
               ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-brand-purple/30 transition-colors">
                     <div className="w-16 h-16 rounded-2xl bg-brand-purple text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                        {item.step}
                     </div>
                     <h3 className="text-xl font-bold text-brand-dark mb-4">{item.title}</h3>
                     <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>

            <div className="text-center mt-16">
               <button 
                  onClick={openBookingLink}
                  className="px-10 py-4 bg-brand-dark text-white font-bold text-lg rounded-full shadow-lg hover:bg-black transition-all"
               >
                  Yes, I Want My Free Test Drive →
               </button>
            </div>
         </div>
      </section>

      {/* --- SECTION 5: THE REAL FULL SYSTEM --- */}
      <section className="py-24 bg-brand-purple/5 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">This is Just a Taste. <span className="text-brand-purple">Imagine the FULL System.</span></h2>
               <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  The free test is just the voice part. The real, full-power AI system does SO much more.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
               {[
                  { icon: MessageSquare, title: "Talks & Texts", desc: "Full conversations by voice AND chat." },
                  { icon: Globe, title: "Works Everywhere", desc: "On Phone, WhatsApp, Facebook, Instagram, Website." },
                  { icon: Zap, title: "Does All The Work", desc: "FAQs, Emergency handling, Books, reschedules, and cancels appointments." },
                  { icon: Clock, title: "Never Forgets", desc: "Sends automatic reminder emails/calls & follow-ups." },
                  { icon: PlugZap, title: "Fits Right In", desc: "Connects easily with the software your clinic uses." },
                  { icon: ShieldCheck, title: "100% Secure", desc: "Full data protection and compliance." }
               ].map((feat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                     <div className="p-3 bg-brand-purple/10 text-brand-purple rounded-xl shrink-0">
                        {/* @ts-ignore */}
                        <feat.icon size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-brand-dark mb-1">{feat.title}</h3>
                        <p className="text-gray-500 text-sm">{feat.desc}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="text-center">
               <button 
                  onClick={openBookingLink}
                  className="px-10 py-4 bg-white border-2 border-brand-purple text-brand-purple font-bold text-lg rounded-full hover:bg-brand-purple hover:text-white transition-all shadow-md"
               >
                  Learn More About The Full System →
               </button>
            </div>
         </div>
      </section>

      {/* --- NEW SECTION: FULL SYSTEM PROOF --- */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden perspective-container">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-brand-dark mb-6 leading-tight tracking-tight"
            >
              Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-600">30% More Revenue</span> with the Full System
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium"
            >
              The trial gives you a glimpse, but the Full System transforms your business. Here is how we deliver 30% growth:
            </motion.p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {fullSystemModules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-[2rem] border border-gray-100 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${mod.bg} ${mod.color} flex items-center justify-center mb-6 shadow-sm`}>
                  <mod.icon size={28} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-4 leading-tight">
                  {mod.title}
                </h3>
                
                <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
                  {mod.body}
                </p>
                
                <div className={`mt-auto pt-6 border-t border-gray-50 text-sm font-bold ${mod.color} flex items-start gap-2`}>
                  <div className="mt-1 shrink-0"><CheckCircle2 size={16} /></div>
                  <span>{mod.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* The Verdict / Bottom-Line Summary */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto rounded-[2.5rem] bg-brand-dark text-white p-8 md:p-16 relative overflow-hidden shadow-2xl text-center"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-bold uppercase tracking-wider mb-6">
                  The Bottom Line
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  The Verdict: <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">30% Practice Growth</span>, Guaranteed.
                </h2>
                
                <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                  Why wait? Skip the test drive and start generating revenue immediately with the fully integrated system.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={openBookingLink}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-dark font-bold text-lg rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                      Skip trial lets do Full ride <ArrowRight size={20} />
                  </button>
                </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- SECTION 6: WHO IS THIS FOR? --- */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">Built for Every Dental Clinic</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {[
                  { icon: User, title: "Solo Dentists", desc: "Let the AI be your helper so you can focus on patients." },
                  { icon: Users, title: "Growing Clinics", desc: "Never miss a call, even when you're busy." },
                  { icon: Building, title: "Large Clinics (DSOs)", desc: "Manage all your locations from one simple dashboard." }
               ].map((p, i) => (
                  <div key={i} className="text-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                     <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md text-brand-purple mb-4">
                        {/* @ts-ignore */}
                        <p.icon size={32} />
                     </div>
                     <h3 className="text-xl font-bold text-brand-dark mb-2">{p.title}</h3>
                     <p className="text-gray-500">{p.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 7: WHY WE ARE DIFFERENT (Comparison) --- */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#1e1b4b_0%,_#000000_100%)]" />
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold mb-4">Don't Buy a Simple Voice Agent.</h2>
               <p className="text-xl text-gray-400">Get a Complete AI Communication System.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
               
               {/* Left: DentiCall */}
               <div className="bg-gradient-to-b from-brand-purple/20 to-brand-purple/5 border border-brand-purple/30 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-accent-cyan" />
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                     <Bot className="text-brand-purple" /> DentiCall AI <span className="text-xs bg-brand-purple px-2 py-1 rounded text-white">Complete</span>
                  </h3>
                  <ul className="space-y-4">
                     {[
                        "Voice AI + Chat AI",
                        "Phone, WhatsApp, Messenger, Instagram & Website",
                        "Connects with your clinic's software",
                        "Sends automatic reminders & follow-ups",
                        "Books, reschedules & cancels appointments 24/7",
                        "Human transfer",
                        "Emergency handling",
                        "Custom Branded Dashboard",
                        "100% customer data protection",
                        "Insurance verification",
                        "Setup takes only 7-14 days"
                     ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-200">
                           <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Right: Others */}
               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 grayscale opacity-80">
                  <h3 className="text-2xl font-bold text-gray-400 mb-6 flex items-center gap-3">
                     <Mic className="text-gray-500" /> Basic Voice Agents
                  </h3>
                  <ul className="space-y-4">
                     {[
                        "Only Voice (No chat)",
                        "No WhatsApp/Messenger",
                        "No automatic reminders and follow-ups",
                        "Only book appointments (no reschedule/cancel)",
                        "No human transfer",
                        "No Emergency handling",
                        "No dashboard",
                        "Zero protection",
                        "Setup takes 4 weeks",
                        "No Insurance verification"
                     ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-400">
                           <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>

            </div>
         </div>
      </section>

      {/* --- ADDED TESTIMONIALS SECTION --- */}
      <Testimonials />

      {/* --- 7. FINAL CTA (Unchanged) --- */}
      <section className="py-32 bg-white text-center relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-brand-dark"
            >
                Start Your Trial — <span className="text-brand-purple">Limited Slots Available</span>
            </motion.h2>
            <p className="text-xl text-gray-500 mb-12 max-w-3xl mx-auto">
              Join other clinics already testing AI and see results in days. No credit card required, no commitment.
            </p>
            <button 
                onClick={openBookingLink}
                className="px-12 py-6 bg-brand-dark text-white font-bold text-xl rounded-full shadow-2xl hover:bg-black hover:scale-105 transition-all"
            >
                Start Trial Now <ArrowRight className="inline ml-2" />
            </button>
            <div className="mt-12 flex justify-center gap-8 text-base text-gray-400 font-medium">
               <span className="flex items-center gap-2"><CheckCircle size={20} className="text-green-500" /> Instant Setup</span>
               <span className="flex items-center gap-2"><CheckCircle size={20} className="text-green-500" /> Cancel Anytime</span>
            </div>
         </div>
      </section>

      {/* --- ADDED MINDS BEHIND SECTION --- */}
      <MindsBehind />

      {/* Re-use Main Footer */}
      <Footer />
    </div>
  );
};

export default ChristmasTrialPage;