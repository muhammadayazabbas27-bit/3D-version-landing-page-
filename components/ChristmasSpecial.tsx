// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, LayoutDashboard, Bot, Gift, Sparkles, Snowflake, Star, Bell } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Trial Onboarding Call",
    icon: Phone,
    emoji: "🎅",
    desc: "15-minute call to discuss your business, requirements, and integrations. We’ll gather all your details to create your custom prototype.",
    color: "bg-red-500"
  },
  {
    id: 2,
    title: "Prototype in 24 Hours",
    icon: LayoutDashboard,
    emoji: "🎄",
    desc: "We build your prototype AI system and dashboard in 24 hours. You review it and request any changes.",
    color: "bg-emerald-500"
  },
  {
    id: 3,
    title: "Access Your AI Agent",
    icon: Bot,
    emoji: "🎁",
    desc: "Get 100 minutes of AI system usage with your agent and see it in action.",
    color: "bg-amber-500"
  }
];

interface ChristmasSpecialProps {
  onTrialClick?: () => void;
}

const ChristmasSpecial: React.FC<ChristmasSpecialProps> = ({ onTrialClick }) => {
  const openBookingLink = () => {
    // Fallback if prop not provided
    if (onTrialClick) {
        onTrialClick();
    } else {
        window.open('https://cal.com/denticall-ai/15min', '_blank');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-red-50/40 to-white perspective-container border-b border-gray-100">
      
      {/* --- FESTIVE BACKGROUND ANIMATIONS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        
        {/* 1. Large Bokeh Ornaments (Glowing Blobs) */}
        <motion.div 
           className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[80px]"
           animate={{ x: [-50, 50, -50], y: [-50, 50, -50], scale: [1, 1.2, 1] }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
           className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[80px]"
           animate={{ x: [50, -50, 50], y: [50, -50, 50], scale: [1.2, 1, 1.2] }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
           className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-[60px]"
           animate={{ opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 2. Abstract Waving Garland (Top) */}
        <svg className="absolute top-0 left-0 w-full h-24 text-green-100/50" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <motion.path 
                fill="currentColor" 
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                animate={{ d: [
                    "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                    "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                    "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>

        {/* 3. Falling Snow */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`snow-${i}`}
            initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ 
              y: "100vh", 
              x: `${Math.random() * 100}%`,
              opacity: [0, 0.8, 0],
              rotate: 360 
            }}
            transition={{ 
              duration: 8 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-slate-300"
          >
            <Snowflake size={Math.random() * 12 + 8} />
          </motion.div>
        ))}

        {/* 4. Twinkling Static Stars */}
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={`twinkle-${i}`}
                className="absolute bg-white rounded-full"
                style={{
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    width: Math.random() * 3 + 1 + "px",
                    height: Math.random() * 3 + 1 + "px",
                }}
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
            />
        ))}

        {/* 5. 3D GLOWING FLOATING ICONS & EMOJIS (UPDATED) */}
        {[...Array(12)].map((_, i) => {
           const assets = [
             { type: 'icon', Icon: Gift, color: 'text-red-500', glow: 'rgba(239,68,68,0.6)' },
             { type: 'icon', Icon: Snowflake, color: 'text-cyan-200', glow: 'rgba(34,211,238,0.6)' },
             { type: 'emoji', content: '🎅', glow: 'rgba(255,0,0,0.5)' }, // Santa Hat / Santa
             { type: 'icon', Icon: Bell, color: 'text-amber-400', glow: 'rgba(251,191,36,0.6)' },
             { type: 'emoji', content: '🎄', glow: 'rgba(34,197,94,0.5)' }, // Tree
             { type: 'icon', Icon: Star, color: 'text-yellow-300', glow: 'rgba(253,224,71,0.6)' }
           ];
           
           const asset = assets[i % assets.length];
           
           return (
             <motion.div
               key={`float-item-${i}`}
               className={`absolute z-0 flex items-center justify-center ${asset.type === 'icon' ? asset.color : ''}`}
               style={{
                  filter: `drop-shadow(0 0 10px ${asset.glow})`
               }}
               initial={{ 
                 top: "110%", 
                 left: `${Math.random() * 95}%`,
                 opacity: 0,
                 scale: 0.5,
                 rotateX: 0,
                 rotateY: 0
               }}
               animate={{ 
                 top: "-20%",
                 opacity: [0, 1, 0],
                 scale: [0.8, 1.2, 0.8],
                 rotateX: [0, 180, 360],
                 rotateY: [0, 360, 0]
               }}
               transition={{ 
                 duration: 12 + Math.random() * 8,
                 repeat: Infinity,
                 ease: "linear",
                 delay: i * 1.5
               }}
             >
               {asset.type === 'icon' ? (
                 <asset.Icon size={32 + Math.random() * 32} strokeWidth={1.5} />
               ) : (
                 <span style={{ fontSize: `${32 + Math.random() * 20}px` }}>{asset.content}</span>
               )}
             </motion.div>
           );
        })}

        {/* 6. Colorful Festive Particles */}
        {[...Array(15)].map((_, i) => {
           const colors = ['bg-red-500', 'bg-green-500', 'bg-amber-400'];
           const color = colors[i % 3];
           return (
             <motion.div
                key={`particle-${i}`}
                className={`absolute rounded-full ${color} blur-[1px]`}
                initial={{ 
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    scale: 0,
                    opacity: 0
                }}
                animate={{ 
                    y: [0, -40, 0],
                    scale: [0, 1, 0],
                    opacity: [0, 0.7, 0]
                }}
                transition={{ 
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5
                }}
                style={{ width: Math.random() * 8 + 4, height: Math.random() * 8 + 4 }}
             />
           )
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100/50 text-red-600 text-sm font-bold uppercase tracking-wider mb-6 border border-red-200 shadow-sm backdrop-blur-sm"
          >
            <Gift size={16} /> Christmas Special Offer
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 drop-shadow-sm"
          >
            🎁 Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-green-600 to-red-600 animate-gradient-x">“Happy Christmas Trial”</span>
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get a taste of how our AI can boost your dental clinic’s appointments this festive season.
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-6xl mx-auto mb-16">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[72px] left-0 w-full h-1 bg-gradient-to-r from-red-200 via-green-200 to-amber-200 rounded-full -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 group hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col items-center h-full"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white text-lg">
                  {step.id}
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 mx-auto rounded-2xl ${step.color} bg-opacity-10 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`absolute -top-3 -right-3 text-3xl animate-bounce-slow drop-shadow-md`}>
                    {step.emoji}
                  </div>
                  <step.icon size={32} className={`text-${step.color.replace('bg-', '')}`} style={{ color: step.id === 2 ? '#10B981' : step.id === 3 ? '#F59E0B' : '#EF4444' }} />
                </div>

                <h3 className="text-xl font-bold text-center text-brand-dark mb-3">{step.title}</h3>
                <p className="text-gray-500 text-center leading-relaxed text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={openBookingLink}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 rounded-full font-bold text-white text-lg shadow-xl overflow-hidden flex items-center justify-center"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-emerald-600 transition-transform duration-500 group-hover:scale-110" />
            
            {/* Sparkle Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <Sparkles className="absolute top-2 left-4 text-yellow-300 animate-spin-slow" size={12} />
               <Sparkles className="absolute bottom-2 right-4 text-yellow-300 animate-pulse text-yellow-300 fill-yellow-300" size={16} />
            </div>

            <span className="relative z-10 flex items-center gap-2">
              Get Your Trial <Sparkles size={18} className="text-yellow-200" />
            </span>
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default ChristmasSpecial;
