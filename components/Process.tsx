// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Cpu, PlugZap, Activity, Rocket } from 'lucide-react';

const steps = [
  { 
    id: 1, 
    title: "Discovery", 
    description: "We listen first. A quick call to learn about your patients, your team, and what keeps you up at night.", 
    icon: PhoneCall,
  },
  { 
    id: 2, 
    title: "Prototype", 
    description: "Interact with your AI prototype. Ensure it books appointments, handles FAQs, and transfers calls exactly how you want.", 
    icon: Cpu,
  },
  { 
    id: 3, 
    title: "Integrate", 
    description: "Integrate your existing softwares. We do the technical setup. You just provide access. No IT skills needed from your side.", 
    icon: PlugZap,
  },
  { 
    id: 4, 
    title: "Launch & Monitor", 
    description: " We go live together. Our team actively monitors calls and optimizes performance. You get a dedicated support contact.", 
    icon: Activity,
  },
];

const Cube3D = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-64 md:h-72 perspective-container group cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-700 ease-out shadow-2xl rounded-3xl"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ rotateY: 180 }} // Keeps desktop hover
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-white border border-gray-100 rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 md:p-8 z-20">
           <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-purple/5 flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <step.icon className="text-brand-purple" size={36} />
           </div>
           <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-2">{step.title}</h3>
           <div className="w-12 h-1.5 bg-brand-purple/20 rounded-full mt-4" />
           <p className="mt-4 text-xs text-gray-400 md:hidden">Tap to reveal</p>
        </div>

        {/* Back Face (Reveal) */}
        <div 
          className="absolute inset-0 backface-hidden bg-brand-purple rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 md:p-8 z-10"
          style={{ transform: "rotateY(180deg)" }}
        >
           <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">{step.title}</h3>
           <p className="text-white/90 text-center leading-relaxed text-base md:text-lg">{step.description}</p>
        </div>
      </motion.div>
      
      {/* Step Number Badge Floating */}
      <div 
        className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-dark text-white font-bold text-lg md:text-xl flex items-center justify-center shadow-lg border-4 border-white z-30 transform group-hover:-translate-y-4 transition-transform duration-300"
      >
        {step.id}
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  const openBookingLink = () => {
    window.open('https://cal.com/denticall-ai/15min', '_blank');
  };

  return (
    <section className="py-16 md:py-32 bg-white relative perspective-container overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-brand-dark mb-4"
          >
             We handle setup and testing - <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">your clinic keeps running normally.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Go live in 4 simple steps.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto mb-16 md:mb-20">
          
          {/* Animated 3D Connecting Line System (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10 preserve-3d pointer-events-none">
             {/* 1. The Track (Base Line) */}
             <div className="absolute left-[10%] right-[10%] h-[3px] bg-gray-100 rounded-full" style={{ transform: "translateZ(-20px)" }} />
             
             {/* 2. The Animated Progress Fill */}
             <motion.div 
               className="absolute left-[10%] h-[3px] bg-gradient-to-r from-brand-purple to-accent-cyan shadow-[0_0_20px_rgba(139,92,246,0.6)] rounded-full"
               style={{ transform: "translateZ(-20px)" }}
               initial={{ width: 0 }}
               whileInView={{ width: "80%" }}
               viewport={{ once: true }}
               transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
             />

             {/* 3. Moving Pulse Particle */}
             <motion.div 
                className="absolute left-[10%] top-1/2 -translate-y-1/2 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl"
                style={{ transform: "translateZ(-30px)" }}
                initial={{ left: "10%" }}
                whileInView={{ left: "90%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
             />
             
             {/* 4. Glowing Nodes at Step Centers */}
             {[12.5, 37.5, 62.5, 87.5].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-brand-purple rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)] z-0"
                  style={{ left: `${pos}%`, transform: "translateZ(-15px) translateY(-50%)" }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.6), duration: 0.4, type: "spring" }}
                />
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 preserve-3d">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                style={{ zIndex: 10 - index }}
              >
                <Cube3D step={step} index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <button 
            onClick={openBookingLink}
            className="group px-8 py-4 bg-brand-dark text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-black transition-all flex items-center gap-3 transform hover:-translate-y-1 w-full md:w-auto justify-center"
          >
            <span>Start Your Transformation</span>
            <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-brand-purple transition-colors">
              <Rocket size={18} />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Process;