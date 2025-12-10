import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

const Counter = ({ value, suffix = "" }: { value: number | string, suffix?: string }) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  // Handle numeric parsing
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const isNumber = !isNaN(numericValue);

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => 
    isNumber ? Math.round(current).toLocaleString() : String(value)
  );

  useEffect(() => {
    if (isInView && isNumber) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, isNumber, spring]);

  return (
    <span ref={nodeRef} className="inline-block tabular-nums">
      {isNumber ? <motion.span>{display}</motion.span> : value}{suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden perspective-container">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
         <div className="text-center mb-16 md:mb-24">
           <motion.h2 
             initial={{ opacity: 0, rotateX: 20 }}
             whileInView={{ opacity: 1, rotateX: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-3xl md:text-5xl font-bold text-brand-dark"
           >
             Real data from <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">industry</span>
           </motion.h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
           {[
             { val: "20-30", suffix: "%", label: "Missed Calls", desc: "Average dental clinic have a month", color: "from-blue-500 to-cyan-400", barHeight: "60%" },
             { val: "30", suffix: "%", label: "No-Show Rate", desc: "Average dental clinic see in a single month", color: "from-purple-500 to-pink-400", barHeight: "40%" },
             { val: "$100K", label: "Lost Revenue Annually ", desc: "Due to Admin Inefficiencies", color: "from-emerald-500 to-teal-400", barHeight: "70%" }
           ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 100, rotateX: 20 }}
               whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: i * 0.2 }}
               whileHover={{ 
                 translateZ: 20,
                 rotateX: 5,
                 boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.2)"
               }}
               className="relative p-6 md:p-10 rounded-[2rem] bg-white border border-gray-100 shadow-2xl preserve-3d group min-h-[250px] md:min-h-[300px] flex flex-col justify-between overflow-hidden"
             >
                {/* 3D Background Light */}
                <div 
                  className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl`} 
                  style={{ transform: "translateZ(-30px)" }}
                />

                <div className="relative z-10 preserve-3d">
                  <div className={`text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br ${stat.color} drop-shadow-sm`} style={{ transform: "translateZ(30px)" }}>
                    <Counter value={stat.val} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-3" style={{ transform: "translateZ(20px)" }}>
                    {stat.label}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base" style={{ transform: "translateZ(10px)" }}>
                    {stat.desc}
                  </p>
                </div>
                
                {/* 3D Bar Chart Visual */}
                <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 px-10 flex items-end justify-center pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity">
                    <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: stat.barHeight }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), type: "spring" }}
                        className={`w-full rounded-t-xl bg-gradient-to-t ${stat.color}`}
                        style={{ transform: "translateZ(-10px)" }}
                    />
                </div>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
};

export default Stats;