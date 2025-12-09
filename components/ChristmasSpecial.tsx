// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Snowflake, Star, Bell, ArrowRight } from 'lucide-react';

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
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-red-50/40 to-white perspective-container border-b border-gray-100">
      
      {/* --- FESTIVE BACKGROUND ANIMATIONS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        
        {/* 1. Large Bokeh Ornaments (Glowing Blobs) */}
        <motion.div 
           className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-500/10 rounded-full blur-[80px]"
           animate={{ x: [-50, 50, -50], y: [-50, 50, -50], scale: [1, 1.2, 1] }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
           className="absolute bottom-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-green-500/10 rounded-full blur-[80px]"
           animate={{ x: [50, -50, 50], y: [50, -50, 50], scale: [1.2, 1, 1.2] }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
           className="absolute top-1/2 left-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-amber-400/10 rounded-full blur-[60px]"
           animate={{ opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 2. Abstract Waving Garland (Top) */}
        <svg className="absolute top-0 left-0 w-full h-16 md:h-24 text-green-100/50" viewBox="0 0 1440 320" preserveAspectRatio="none">
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100/50 text-red-600 text-xs md:text-sm font-bold uppercase tracking-wider mb-6 border border-red-200 shadow-sm backdrop-blur-sm"
          >
            <Gift size={16} /> Christmas Special Offer
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-brand-dark mb-4 drop-shadow-sm"
          >
            🎁 Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-green-600 to-red-600 animate-gradient-x">“Happy Christmas Trial”</span>
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Get a taste of how our AI can boost your dental clinic’s appointments this festive season.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-lg font-bold text-brand-purple cursor-pointer flex items-center justify-center gap-2"
             onClick={openBookingLink}
          >
              Click below to unlock your 100 free minutes <ArrowRight size={18} className="animate-bounce-slow" />
          </motion.div>
        </div>

        {/* CTA Button - Centered and Prominent */}
        <div className="flex justify-center">
          <motion.button
            onClick={openBookingLink}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full md:w-auto px-12 py-6 rounded-full font-bold text-white text-xl shadow-xl overflow-hidden flex items-center justify-center"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-emerald-600 transition-transform duration-500 group-hover:scale-110" />
            
            {/* Sparkle Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <Sparkles className="absolute top-2 left-4 text-yellow-300 animate-spin-slow" size={12} />
               <Sparkles className="absolute bottom-2 right-4 text-yellow-300 animate-pulse text-yellow-300 fill-yellow-300" size={16} />
            </div>

            <span className="relative z-10 flex items-center gap-3">
              See the Trial Here <Sparkles size={18} className="text-yellow-200" />
            </span>
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default ChristmasSpecial;