import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Globe } from 'lucide-react';

const leaders = [
  {
    name: "Muhammad Ayaz",
    role: "Founder & CEO",
    image: "https://i.ibb.co/bMgHfJ1D/Gemini-Generated-Image-t08kzkt08kzkt08k.png",
    bio: "Visionary driving the AI revolution in dental care."
  },
  {
    name: "Co-Founder", 
    role: "Co-Founder & CTO",
    image: "https://i.ibb.co/dsf1Zf1j/IMG-3984.jpg",
    bio: "Engineering the intelligence behind the voice."
  }
];

const MindsBehind: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden perspective-container border-t border-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-50/50 via-white to-white pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 tracking-tight">
             The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-600">Minds Behind</span>
           </h2>
           <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
             Building the future of patient communication with passion and precision.
           </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-4xl mx-auto perspective-container">
           {leaders.map((leader, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30, rotateX: 10 }}
               whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2, duration: 0.8 }}
               whileHover={{ y: -10 }}
               className="group relative flex-1"
             >
                {/* 3D Hover Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-accent-cyan/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                <div className="relative bg-white rounded-[2.5rem] p-4 shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 group-hover:shadow-2xl group-hover:border-brand-purple/20">
                   
                   {/* Image Container */}
                   <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-gray-100">
                      <div className="absolute inset-0 bg-brand-purple/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                        onError={(e) => {
                          // Fallback if image not found
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${leader.name}&background=random&size=500`;
                        }}
                      />
                   </div>

                   {/* Content */}
                   <div className="text-center px-4 pb-4">
                      <h3 className="text-2xl font-bold text-brand-dark mb-1 group-hover:text-brand-purple transition-colors">{leader.name}</h3>
                      <div className="inline-block px-3 py-1 rounded-full bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 border border-gray-100 group-hover:bg-brand-purple/5 group-hover:text-brand-purple group-hover:border-brand-purple/10 transition-all">
                        {leader.role}
                      </div>
                      
                      {/* Social Links (Visual Only) */}
                      <div className="flex justify-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity pt-2 border-t border-gray-50">
                         <Linkedin size={20} className="hover:text-brand-purple cursor-pointer transition-colors" />
                         <Twitter size={20} className="hover:text-accent-cyan cursor-pointer transition-colors" />
                         <Globe size={20} className="hover:text-gray-900 cursor-pointer transition-colors" />
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default MindsBehind;