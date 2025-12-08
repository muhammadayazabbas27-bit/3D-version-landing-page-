import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, UserX, Heart, CalendarX, AlertCircle } from 'lucide-react';

const pains = [
  { icon: PhoneOff, title: "Missed Calls", desc: "Clinics miss 20–30% of inbound calls every month, losing potential patients.", stat: "50%" },
  { icon: UserX, title: "High No-Show Rate", desc: "Average 30% no-show rate eats into revenue and wastes chair time.", stat: "30%" },
  { icon: Heart, title: "Trust Gap", desc: "Lack of pre-appointment follow-up reduces patient confidence and loyalty.", stat: "Low" },
  { icon: CalendarX, title: "Scheduling Gaps", desc: "Empty slots mean lost revenue that can never be recovered.", stat: "Lost" },
];

const FlipCard = ({ item, index }: { item: typeof pains[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-auto min-h-[300px] perspective-container cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full min-h-[300px] transition-all duration-700 transform-style-3d"
        animate={{ rotateY: isHovered || isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center hover:border-brand-purple/20"
        >
           <div className="w-20 h-20 rounded-full bg-brand-gray flex items-center justify-center mb-6 text-brand-dark group-hover:scale-110 transition-transform">
             <item.icon size={36} className="text-brand-purple" />
           </div>
           <h3 className="text-2xl font-bold text-brand-dark mb-2">{item.title}</h3>
           <p className="text-gray-400 text-sm mt-2 font-medium">Hover or tap for details</p>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden bg-brand-dark rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center rotate-y-180 border border-brand-purple/20"
          style={{ transform: "rotateY(180deg)" }}
        >
           <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-400 mb-4">
             {item.stat}
           </div>
           <p className="text-gray-300 leading-relaxed font-medium">
             {item.desc}
           </p>
           <div className="mt-6 p-2 bg-white/5 rounded-full">
             <AlertCircle size={20} className="text-red-400" />
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const PainPoints: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-gray relative overflow-hidden perspective-container">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-200/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
             <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4 md:mb-6 tracking-tight">
                Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-cyan">Problems</span> Solved
             </h2>
             <p className="text-gray-500 max-w-2xl mx-auto text-lg">Identifying the silent revenue killers in your practice.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {pains.map((p, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <FlipCard item={p} index={i} />
               </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default PainPoints;