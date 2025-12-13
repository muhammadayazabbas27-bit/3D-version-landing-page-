import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { User, TrendingUp, Globe } from 'lucide-react';

const personas = [
  { 
    icon: User, 
    title: "Solo Dentists", 
    desc: "Reduce overhead while never missing a patient call.", 
    height: "20px",
    tier: 1
  },
  { 
    icon: TrendingUp, 
    title: "Growing Clinics", 
    desc: "Handle increasing call volume without adding front-desk pressure.", 
    height: "50px",
    tier: 2
  },
  { 
    icon: Globe, 
    title: "Multi-Location", 
    desc: "Centralize communication and reporting across all locations.", 
    height: "80px",
    tier: 3
  },
];

const TiltCard = ({ children, className = "", baseHeight = "20px" }: { children?: React.ReactNode, className?: string, baseHeight?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = clientX - rect.left - rect.width / 2;
    const yPos = clientY - rect.top - rect.height / 2;
    x.set(xPos);
    y.set(yPos);
  }

  function onMouseLeave() {
    setHover(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onMouseLeave}
      style={{
        rotateY: useTransform(mouseX, [-200, 200], [-15, 15]),
        rotateX: useTransform(mouseY, [-200, 200], [15, -15]),
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ease-out w-full ${className}`}
    >
      {/* 3D Base/Platform Effect */}
      <div 
        className="absolute inset-0 bg-gray-900/5 rounded-[2.5rem] translate-y-8 blur-xl transition-all duration-300 group-hover:translate-y-12 group-hover:blur-2xl"
        style={{ transform: `translateZ(-${baseHeight})` }}
      />
      
      {/* Platform Sides (Simulated extrusion) */}
      <div 
         className="absolute bottom-0 left-4 right-4 bg-gray-100 rounded-b-[2rem] -z-10"
         style={{ height: parseInt(baseHeight) + 40 + 'px', transform: "translateZ(-10px)" }}
      />

      <div 
        style={{ transform: "translateZ(20px)" }}
        className="h-full w-full bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-2xl group-hover:border-brand-purple/30 transition-all relative z-10 flex flex-col items-start"
      >
        {children}
      </div>
    </motion.div>
  );
};

const Personas: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-gray/30 perspective-container overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight"
          >
            Built for <span className="text-brand-purple">everyone</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            Scalable infrastructure that fits perfectly for any size practice.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-0 md:px-4 items-end">
          {personas.map((p, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ 
                 delay: i * 0.2, 
                 duration: 0.8, 
                 type: "spring",
                 bounce: 0.4
               }}
               className="perspective-container group w-full"
             >
               {/* Apply different top padding to simulate tiered layout visually on grid */}
               <div style={{ paddingBottom: `${(i) * 40}px` }} className="pb-8 md:pb-[calc(var(--padding-bottom))]">
                   <TiltCard baseHeight={p.height} className="h-full">
                     <div style={{ transform: "translateZ(40px)" }} className={`w-16 h-16 rounded-2xl bg-brand-purple/5 text-brand-purple flex items-center justify-center mb-8 group-hover:bg-brand-purple group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                       <p.icon size={32} />
                     </div>
                     <h3 style={{ transform: "translateZ(30px)" }} className="text-2xl font-bold text-brand-dark mb-4">{p.title}</h3>
                     <p style={{ transform: "translateZ(20px)" }} className="text-gray-500 leading-relaxed text-lg">{p.desc}</p>
                   </TiltCard>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Personas;