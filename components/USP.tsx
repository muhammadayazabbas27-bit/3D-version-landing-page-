import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, ShieldCheck, Globe2, MessageSquare, Phone, Calendar, Bot, BrainCircuit } from 'lucide-react';

const usps = [
  { text: "24/7 Call Handling", icon: Phone },
  { text: "Multilingual Voice System", icon: Globe2 },
  { text: "Works like Social Bot + WhatsApp Agent", icon: MessageSquare },
  { text: "Automatic Booking Engine", icon: Calendar },
  { text: "Smart Follow-ups & Reminders", icon: Zap },
  { text: "Enterprise-Level Security", icon: ShieldCheck },
  { text: "Integrates With Anything", icon: BrainCircuit },
  { text: "More Affordable Than Hiring", icon: CheckCircle2 }
];

const USP: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative perspective-container overflow-hidden">
      {/* 3D Grid Floor - subtle */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ 
            backgroundImage: 'linear-gradient(90deg, #8B5CF6 1px, transparent 1px), linear-gradient(#8B5CF6 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-200px) scale(3)'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
         <div className="text-center mb-16 md:mb-24 relative">
           <motion.div 
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/5 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-sm"
           >
             <Zap size={12} className="fill-current" /> Unique Advantage
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-3xl md:text-6xl font-bold text-brand-dark mb-4 tracking-tight"
           >
             Not a chatbot. Not a call center.
           </motion.h2>
           <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-cyan tracking-tight"
           >
             A complete AI communication System.
           </motion.h3>
         </div>

         {/* 3D Comparison Visualization */}
         <div className="flex justify-center mb-16 md:mb-24 preserve-3d">
            <motion.div 
               className="relative w-full max-w-4xl min-h-[160px] md:h-40 flex flex-col md:flex-row items-center justify-between px-6 py-8 md:py-0 md:px-12 bg-white rounded-[2rem] shadow-2xl border border-gray-100 gap-8 md:gap-0"
               initial={{ rotateX: 20, opacity: 0 }}
               whileInView={{ rotateX: 0, opacity: 1 }}
               viewport={{ once: true }}
               style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="flex flex-col items-center opacity-40 grayscale" style={{ transform: "translateZ(20px)" }}>
                    <Bot size={48} className="mb-2" />
                    <span className="font-bold text-gray-400 text-center">Basic Chatbot</span>
                </div>
                
                {/* 3D Connecting Line */}
                <div className="w-1 h-20 md:w-auto md:flex-1 md:h-1 bg-gray-100 md:mx-12 rounded-full relative overflow-hidden">
                    <motion.div 
                       className="absolute inset-x-0 bottom-0 md:inset-y-0 md:left-0 bg-brand-purple" 
                       initial={{ height: "0%", width: "100%" }}
                       whileInView={{ height: "100%", width: "100%" }} // Adjusted logic: simply fill on view
                       transition={{ duration: 1.5, delay: 0.5 }}
                       // Responsive style overrides via standard CSS classes or inline logic
                       style={{ 
                           // On mobile (default), animate height. On desktop, animate width.
                           // Framer Motion constraints make this tricky inline, so we simplify:
                           // Just fill the bar.
                           width: "100%",
                           height: "100%"
                       }}
                    />
                </div>

                <div className="flex flex-col items-center" style={{ transform: "translateZ(40px)" }}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-purple blur-xl opacity-20 rounded-full" />
                        <BrainCircuit size={56} className="mb-2 text-brand-purple relative z-10" />
                    </div>
                    <span className="font-bold text-brand-dark text-center">DentiCall AI System</span>
                </div>
            </motion.div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto perspective-container">
           {usps.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, z: -100, rotateX: 20 }}
               whileInView={{ opacity: 1, z: 0, rotateX: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05, duration: 0.6, type: "spring", stiffness: 100 }}
               whileHover={{ 
                   scale: 1.05, 
                   z: 30, 
                   rotateX: -10,
                   rotateY: 5,
                   boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)"
               }}
               className="group flex flex-col items-center p-6 md:p-8 rounded-3xl bg-white border border-gray-100 shadow-lg cursor-default preserve-3d hover:border-brand-purple/30 transition-colors"
             >
               <div 
                 className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-6 group-hover:from-brand-purple group-hover:to-violet-600 transition-all duration-300 shadow-inner"
                 style={{ transform: "translateZ(30px)" }}
               >
                  <item.icon size={28} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
               </div>
               <span 
                 className="text-brand-dark font-bold text-center leading-snug group-hover:text-brand-purple transition-colors duration-300 text-lg"
                 style={{ transform: "translateZ(20px)" }}
               >
                   {item.text}
               </span>
               
               {/* Animated connection line effect on hover */}
               <div className="absolute bottom-0 left-0 h-1 bg-brand-purple w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl" />
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
};

export default USP;