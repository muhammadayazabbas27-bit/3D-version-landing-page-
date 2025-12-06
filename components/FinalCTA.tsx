
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Calendar, MessageCircle, ArrowRight, Activity, CheckCircle } from 'lucide-react';

const FinalCTA: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);
  const rotateX = useTransform(scrollYProgress, [0.8, 1], [20, 0]);

  const openBookingLink = () => {
    window.open('https://cal.com/ayaz-abbas-hitit.agency/out-bound-warm-leads-appointments', '_blank');
  };

  return (
    <section className="py-32 relative overflow-hidden perspective-container">
       {/* 3D Background Gradient/Mesh */}
       <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-gray/50 to-white pointer-events-none" />
       
       <div className="container mx-auto px-6 relative z-10">
         <motion.div
           style={{ y, rotateX, transformStyle: "preserve-3d" }}
           className="relative max-w-5xl mx-auto rounded-[3rem] bg-brand-dark overflow-hidden shadow-2xl shadow-brand-purple/20 border border-white/10"
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
                 className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/30 rounded-full blur-[60px]" 
               />
               <motion.div 
                 animate={{ 
                   y: [0, 20, 0],
                   rotate: [0, -5, 0],
                   scale: [1, 1.2, 1]
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent-cyan/20 rounded-full blur-[60px]" 
               />
            </div>

            <div className="relative z-10 px-8 py-20 md:p-24 flex flex-col items-center text-center">
                
                {/* Floating Icon Orb */}
                <motion.div 
                   initial={{ scale: 0, rotate: 180 }}
                   whileInView={{ scale: 1, rotate: 0 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", stiffness: 100, damping: 20 }}
                   className="w-24 h-24 mb-10 rounded-3xl bg-gradient-to-br from-brand-purple to-violet-600 flex items-center justify-center shadow-lg shadow-brand-purple/40 border border-white/20"
                >
                   <Activity size={48} className="text-white" />
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
                >
                  Ready to run on <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-cyan">Autopilot?</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed"
                >
                  Join forward-thinking clinics using DentiCall to eliminate missed calls and fill their schedules automatically.
                </motion.p>

                <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg justify-center relative z-20">
                   <motion.button
                     onClick={openBookingLink}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="cursor-pointer pointer-events-auto relative z-50 px-8 py-4 bg-white text-brand-dark font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                   >
                     Get Started Now <ArrowRight size={20} />
                   </motion.button>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 flex items-center gap-6 text-sm text-gray-400 font-medium"
                >
                   <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> No credit card required</span>
                   <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> 14-day free trial</span>
                </motion.div>
            </div>
         </motion.div>
       </div>
    </section>
  );
};

export default FinalCTA;