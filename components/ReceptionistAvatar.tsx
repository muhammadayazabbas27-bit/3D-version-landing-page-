// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';

interface AvatarProps {
  active: boolean;
  volume: MotionValue<number>;
}

const ReceptionistAvatar: React.FC<AvatarProps> = ({ active, volume }) => {
  // Smooth volume for mouth movement
  const smoothVolume = useSpring(volume, { stiffness: 300, damping: 30 });
  
  // Transform volume to mouth dimensions
  const mouthHeight = useTransform(smoothVolume, [0, 1], [2, 12]);
  const mouthWidth = useTransform(smoothVolume, [0, 1], [20, 30]);
  
  // Blinking Logic
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    const blinkLoop = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => clearInterval(blinkLoop);
  }, []);

  return (
    <div className="relative w-40 h-40 preserve-3d flex items-center justify-center">
      
      {/* --- HEAD CONTAINER --- */}
      <motion.div
        className="relative w-32 h-28 bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(139,92,246,0.3)] flex flex-col items-center justify-center z-20 preserve-3d"
        animate={{ 
          y: [0, -8, 0],
          rotateX: [0, 2, 0],
          rotateZ: [0, 1, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Antenna */}
        <div className="absolute -top-5 w-1 h-5 bg-gray-300 rounded-full flex flex-col items-center justify-end">
           <motion.div 
             className={`w-3 h-3 rounded-full shadow-sm ${active ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-red-400'}`}
             animate={{ scale: active ? [1, 1.2, 1] : 1 }}
             transition={{ duration: 1, repeat: Infinity }}
           />
        </div>

        {/* Face Screen */}
        <div className="relative w-24 h-16 bg-brand-dark rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-gray-800 shadow-inner">
            
            {/* Eyes Container */}
            <div className="flex gap-3 mb-2">
               {/* Left Eye */}
               <motion.div 
                 className="w-2.5 h-3.5 bg-accent-cyan rounded-full shadow-[0_0_8px_#22d3ee]"
                 animate={{ 
                   scaleY: isBlinking ? 0.1 : 1,
                   opacity: active ? 1 : 0.6 
                 }}
                 transition={{ duration: 0.1 }}
               />
               {/* Right Eye */}
               <motion.div 
                 className="w-2.5 h-3.5 bg-accent-cyan rounded-full shadow-[0_0_8px_#22d3ee]"
                 animate={{ 
                   scaleY: isBlinking ? 0.1 : 1,
                   opacity: active ? 1 : 0.6
                 }}
                 transition={{ duration: 0.1 }}
               />
            </div>

            {/* Mouth (Dynamic Audio Viz) */}
            <motion.div 
                className="bg-brand-purple rounded-full shadow-[0_0_5px_#8b5cf6]"
                style={{ 
                    height: active ? mouthHeight : 2,
                    width: mouthWidth,
                    opacity: active ? 1 : 0.5
                }}
            />

            {/* Screen Glare */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-xl pointer-events-none" />
        </div>

        {/* Ears / Headphones */}
        <div className="absolute -left-2 w-3 h-8 bg-gray-200 rounded-l-md border-r border-gray-300 top-1/2 -translate-y-1/2" />
        <div className="absolute -right-2 w-3 h-8 bg-gray-200 rounded-r-md border-l border-gray-300 top-1/2 -translate-y-1/2" />

      </motion.div>

      {/* --- NECK --- */}
      <motion.div 
        className="absolute bottom-4 w-12 h-6 bg-gray-200 rounded-lg -z-10 border border-white shadow-inner"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
      />

      {/* --- FLOATING CHAT BUBBLE (Decorative) --- */}
      <motion.div 
         className="absolute -right-6 -top-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs shadow-lg border border-gray-100"
         initial={{ opacity: 0, scale: 0 }}
         animate={{ 
             y: [0, -10, 0], 
             opacity: active ? [0, 1, 1, 0] : 0, 
             scale: active ? 1 : 0
         }}
         transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        👋
      </motion.div>

    </div>
  );
};

export default ReceptionistAvatar;