// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Activity, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const openBookingLink = () => {
    window.open('https://cal.com/denticall-ai/30min', '_blank');
  };

  return (
    <footer className="bg-brand-dark pt-16 md:pt-20 pb-10 relative overflow-hidden text-white perspective-container border-t border-white/10">
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

      <div className="container mx-auto px-4 md:px-6 relative z-10 preserve-3d">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            
            {/* Column 1: Brand & Desc - Mobile: Centered, Desktop: Left */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left preserve-3d">
                <motion.div 
                    initial={{ opacity: 0, rotateX: 30 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6 hover:scale-105 transition-transform cursor-default"
                >
                    <div 
                    className="w-10 h-10 bg-gradient-to-br from-brand-purple to-violet-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-white/20"
                    style={{ transform: "translateZ(20px)" }}
                    >
                        <Activity size={20} />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-white tracking-tight drop-shadow-lg" style={{ transform: "translateZ(10px)" }}>
                    Denti<span className="text-brand-purple">Call</span>
                    </h2>
                </motion.div>
                
                <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base mb-8 max-w-xs mx-auto md:mx-0">
                    The world's most advanced AI voice system for dental clinics. Automating care, 24/7.
                </p>

                {/* Mobile CTA */}
                <button 
                   onClick={openBookingLink}
                   className="md:hidden w-full max-w-[240px] px-6 py-3 rounded-full bg-brand-purple text-white font-bold text-sm shadow-lg mb-8 flex items-center justify-center gap-2 mx-auto active:scale-95 transition-transform"
                >
                   Book a free consult <ArrowRight size={14} />
                </button>
            </div>

            {/* Column 2: Contact & Locations - Mobile: Centered, Desktop: Left */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center md:items-start w-full"
                 >
                    {/* Email */}
                    <a 
                        href="mailto:support@denticall.pro" 
                        className="flex items-center gap-3 text-slate-300 hover:text-brand-purple transition-colors group px-4 py-2 rounded-lg hover:bg-white/5 mb-6 md:mb-8"
                    >
                        <div className="p-2 bg-brand-purple/10 rounded-full group-hover:bg-brand-purple group-hover:text-white transition-colors shrink-0">
                            <Mail size={16} />
                        </div>
                        <span className="text-sm font-medium">support@denticall.pro</span>
                    </a>

                    {/* Divider for Mobile */}
                    <div className="w-24 h-px bg-white/10 mb-8 md:hidden" />

                    {/* Locations */}
                    <div className="flex flex-col items-center md:items-start space-y-4 w-full">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">We operate in</h4>
                        
                        <div className="flex items-start gap-3 text-sm text-slate-300 max-w-xs md:max-w-none">
                            <MapPin size={16} className="mt-0.5 text-brand-purple shrink-0" />
                            <span className="text-left leading-snug">Pakistan — Punjab, Gujranwala</span>
                        </div>
                        
                        <div className="flex items-start gap-3 text-sm text-slate-300 max-w-xs md:max-w-none">
                            <MapPin size={16} className="mt-0.5 text-brand-purple shrink-0" />
                            <span className="text-left leading-snug">Australia — Queensland, Runcorn</span>
                        </div>
                    </div>
                 </motion.div>
            </div>

            {/* Column 3: Social & Desktop CTA - Mobile: Centered, Desktop: Right */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-8">
                
                {/* Desktop CTA */}
                <motion.button
                    onClick={openBookingLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-brand-purple hover:border-brand-purple transition-all text-sm font-bold shadow-lg items-center gap-2"
                >
                    Book a free consult <ArrowRight size={16} />
                </motion.button>

                <div className="flex items-center space-x-4">
                    {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
                        <motion.a 
                        key={i} 
                        href="#" 
                        whileHover={{ 
                            y: -4, 
                            scale: 1.1, 
                            color: "#8B5CF6",
                        }}
                        className="text-slate-500 hover:text-brand-purple transition-colors duration-300 bg-white/5 p-2.5 rounded-full border border-transparent hover:border-brand-purple/30"
                        >
                        <Icon size={18} />
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-slate-500 font-sans relative gap-4 md:gap-0"
        >
             {/* Wave Effect on Border */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent opacity-50" />

          <p className="hover:text-slate-300 transition-colors">&copy; {new Date().getFullYear()} DentiCall AI Inc.</p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <span className="hidden md:inline text-slate-700">|</span>
             <span className="hover:text-brand-purple cursor-pointer transition-colors">Made for the Future</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;