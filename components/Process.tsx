
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Cpu, PlugZap, Activity, ArrowRight, Rocket } from 'lucide-react';

const steps = [
  { 
    id: 1, 
    title: "Discovery", 
    description: "10–15 min call to understand your goals.", 
    icon: PhoneCall,
  },
  { 
    id: 2, 
    title: "Prototype", 
    description: "Test your custom AI voice agent & call logs.", 
    icon: Cpu,
  },
  { 
    id: 3, 
    title: "Integrate", 
    description: "Connect CRM, calendar, IVR, & refine prompts.", 
    icon: PlugZap,
  },
  { 
    id: 4, 
    title: "Go Live", 
    description: "Full operation with continuous monitoring.", 
    icon: Activity,
  },
];

const Cube3D = ({ step, index }: { step: typeof steps[0], index: number }) => {
  return (
    <div className="relative w-full h-72 perspective-container group cursor-pointer">
      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-700 ease-out group-hover:rotate-y-180 shadow-2xl rounded-3xl"
        initial={{ rotateY: 0 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-white border border-gray-100 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 z-20">
           <div className="w-24 h-24 rounded-full bg-brand-purple/5 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
             <step.icon className="text-brand-purple" size={40} />
           </div>
           <h3 className="text-2xl font-bold text-brand-dark mb-2">{step.title}</h3>
           <div className="w-12 h-1.5 bg-brand-purple/20 rounded-full mt-4" />
        </div>

        {/* Back Face (Reveal) */}
        <div 
          className="absolute inset-0 backface-hidden bg-brand-purple rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 z-10"
          style={{ transform: "rotateY(180deg)" }}
        >
           <h3 className="text-2xl font-bold text-white mb-6">{step.title}</h3>
           <p className="text-white/90 text-center leading-relaxed text-lg">{step.description}</p>
        </div>
      </motion.div>
      
      {/* Step Number Badge Floating */}
      <div 
        className="absolute -top-6 -left-6 w-14 h-14 rounded-full bg-brand-dark text-white font-bold text-xl flex items-center justify-center shadow-lg border-4 border-white z-30 transform group-hover:-translate-y-4 transition-transform duration-300"
      >
        {step.id}
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  const openBookingLink = () => {
    window.open('https://cal.com/ayaz-abbas-hitit.agency/out-bound-warm-leads-appointments', '_blank');
  };

  return (
    <section className="py-32 bg-white relative perspective-container overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-brand-dark mb-4"
          >
             Clear. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">Fast. Accountable.</span>
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

        <div className="relative max-w-7xl mx-auto mb-20">
          {/* Connecting Arrows 3D */}
          <div className="hidden lg:flex absolute top-1/2 left-0 w-full justify-between px-32 -translate-y-1/2 pointer-events-none z-0" style={{ transform: "translateZ(-20px)" }}>
             {[1, 2, 3].map((i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 0.2, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                 >
                    <ArrowRight size={48} className="text-brand-purple" />
                 </motion.div>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 preserve-3d">
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
            className="group px-8 py-4 bg-brand-dark text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-black transition-all flex items-center gap-3 transform hover:-translate-y-1"
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
