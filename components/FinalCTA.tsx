// @ts-nocheck
import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, MessageCircle, ArrowRight, Activity, CheckCircle } from 'lucide-react';

const FinalCTA: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);
  const rotateX = useTransform(scrollYProgress, [0.8, 1], [20, 0]);

  const [ripples, setRipples] = useState<{x: number, y: number, id: number}[]>([]);

  const openBookingLink = () => {
    // Delay slightly to show ripple
    setTimeout(() => {
        window.open('https://cal.com/denticall-ai/15min', '_blank');
    }, 200);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);
    
    openBookingLink();
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden perspective-container">
       {/* 3D Background Gradient/Mesh */}
       <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-gray/50 to-white pointer-events-none" />
       
       <div className="container mx-auto px-4 md:px-6 relative z-10">
         <motion.div
           style={{ y, rotateX, transformStyle: "preserve-3d" }}
           className="relative max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] bg-brand-dark overflow-hidden shadow-2xl shadow-brand-purple/20 border border-white/10"
         >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
            
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <motion.div 
                 animate={{ 
                   y: [0, -20, 0],
                   rotate: [0, 5, 0],
                   scale: [1, 1.1, 1]
                 }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-purple/30 rounded-full blur-[60px]" 
               />
               <motion.div 
                 animate={{ 
                   y: [0, 20, 0],
                   rotate: [0, -5, 0],
                   scale: [1, 1.2, 1]
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-cyan/20 rounded-full blur-[60px]" 
               />
            </div>

            <div className="relative z-10 px-6 py-12 md:px-8 md:py-24 md:p-24 flex flex-col items-center text-center">
                
                {/* Floating Icon Orb */}
                <motion.div 
                   initial={{ scale: 0, rotate: 180 }}
                   whileInView={{ scale: 1, rotate: 0 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", stiffness: 100, damping: 20 }}
                   className="w-20 h-20 md:w-24 md:h-24 mb-8 md:mb-10 rounded-3xl bg-gradient-to-br from-brand-purple to-violet-600 flex items-center justify-center shadow-lg shadow-brand-purple/40 border border-white/20"
                >
                   <Activity size={40} className="text-white md:w-12 md:h-12" />
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
                >
                  Ready to run on <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-cyan">Autopilot?</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed"
                >
                  Join forward-thinking clinics using DentiCall to eliminate missed calls and fill their schedules automatically.
                </motion.p>

                <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg justify-center relative z-20">
                   {/* Enhanced Interaction Button */}
                   <motion.button
                     onClick={handleButtonClick}
                     whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.4)" }}
                     whileTap={{ scale: 0.95 }}
                     className="relative cursor-pointer pointer-events-auto z-50 px-8 py-4 md:px-10 md:py-5 bg-white text-brand-dark font-bold text-lg md:text-xl rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 overflow-hidden group w-full md:w-auto"
                   >
                     {/* Continuous Holographic Shine */}
                     <motion.div 
                        className="absolute inset-0 w-[50%] bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 opacity-50"
                        initial={{ x: "-150%" }}
                        animate={{ x: "250%" }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                     />

                     {/* Liquid Ripples */}
                     <AnimatePresence>
                       {ripples.map((ripple) => (
                         <motion.span
                           key={ripple.id}
                           initial={{ scale: 0, opacity: 0.5 }}
                           animate={{ scale: 4, opacity: 0 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.8 }}
                           className="absolute rounded-full bg-brand-purple/20 pointer-events-none"
                           style={{ 
                             left: ripple.x, 
                             top: ripple.y, 
                             width: 50, 
                             height: 50, 
                             marginLeft: -25, 
                             marginTop: -25 
                           }}
                         />
                       ))}
                     </AnimatePresence>

                     <span className="relative z-10">Start Trial Now</span>
                     
                     {/* Elastic Arrow Animation */}
                     <motion.div
                       className="relative z-10"
                       animate={{ x: [0, 5, 0] }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                     >
                        <ArrowRight size={24} className="group-hover:text-brand-purple transition-colors" />
                     </motion.div>
                   </motion.button>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm text-gray-400 font-medium"
                >
                   <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> No credit card required</span>
                   <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Free trial</span>
                </motion.div>
            </div>
         </motion.div>
       </div>
    </section>
  );
};

export default FinalCTA;