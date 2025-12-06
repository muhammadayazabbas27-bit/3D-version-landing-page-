import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Activity } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark pt-24 pb-12 relative overflow-hidden text-white perspective-container border-t border-white/5">
      {/* 3D Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-brand-purple/10 rounded-full blur-3xl"
            initial={{ 
              width: Math.random() * 300 + 100, 
              height: Math.random() * 300 + 100,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              z: Math.random() * -100
            }}
            animate={{ 
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10 preserve-3d">
        
        <motion.div 
            initial={{ opacity: 0, rotateX: 30 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8 hover:scale-105 transition-transform cursor-default preserve-3d"
        >
            <div 
              className="w-12 h-12 bg-gradient-to-br from-brand-purple to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/20"
              style={{ transform: "translateZ(20px)" }}
            >
                <Activity size={24} />
            </div>
            <h2 className="text-3xl font-heading font-bold text-white tracking-tight drop-shadow-lg" style={{ transform: "translateZ(10px)" }}>
              Denti<span className="text-brand-purple">Call</span>
            </h2>
        </motion.div>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mb-10 font-sans font-light text-slate-300 leading-relaxed text-lg"
            style={{ transform: "translateZ(5px)" }}
        >
          The world's most advanced AI voice system for dental clinics. <br/>
          <span className="text-slate-400">Automating care, 24/7.</span>
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex space-x-8 mb-16"
        >
          {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
            <motion.a 
              key={i} 
              href="#" 
              whileHover={{ 
                  y: -8, 
                  scale: 1.2, 
                  color: "#8B5CF6",
                  textShadow: "0 0 10px rgba(139,92,246,0.5)" 
              }}
              className="text-slate-400 transition-all duration-300 transform"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-sans relative"
        >
             {/* Wave Effect on Border */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent opacity-50" />

          <p className="hover:text-slate-300 transition-colors">&copy; {new Date().getFullYear()} DentiCall AI Inc.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
             <a href="#" className="hover:text-white transition-colors relative group">
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-purple transition-all group-hover:w-full"></span>
             </a>
             <a href="#" className="hover:text-white transition-colors relative group">
                Terms
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-purple transition-all group-hover:w-full"></span>
             </a>
             <span className="text-slate-700">|</span>
             <span className="hover:text-brand-purple cursor-pointer transition-colors">Made for the Future</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;