import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIncoming, CalendarCheck, MessageCircle, Globe, Share2, Voicemail, RotateCcw, Bell, Cpu, Zap } from 'lucide-react';

const features = [
  { 
    title: "24/7 Answering", 
    icon: PhoneIncoming, 
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-500/10 border-blue-500/20"
  },
  { 
    title: "Auto Booking", 
    icon: CalendarCheck, 
    color: "from-purple-400 to-purple-600",
    bg: "bg-purple-500/10 border-purple-500/20" 
  },
  { 
    title: "WhatsApp AI", 
    icon: MessageCircle, 
    color: "from-teal-400 to-teal-600",
    bg: "bg-teal-500/10 border-teal-500/20" 
  },
  { 
    title: "Multilingual", 
    icon: Globe, 
    color: "from-indigo-400 to-indigo-600",
    bg: "bg-indigo-500/10 border-indigo-500/20" 
  },
  { 
    title: "Social Bot", 
    icon: Share2, 
    color: "from-pink-400 to-pink-600",
    bg: "bg-pink-500/10 border-pink-500/20" 
  },
  { 
    title: "Missed Calls", 
    icon: Voicemail, 
    color: "from-red-400 to-red-600",
    bg: "bg-red-500/10 border-red-500/20" 
  },
  { 
    title: "Reactivation", 
    icon: RotateCcw, 
    color: "from-yellow-400 to-yellow-600",
    bg: "bg-yellow-500/10 border-yellow-500/20" 
  },
  { 
    title: "Smart Reminders", 
    icon: Bell, 
    color: "from-violet-400 to-violet-600",
    bg: "bg-violet-500/10 border-violet-500/20" 
  },
];

// The Central "Neural Processor" - High Tech 3D Core
const AICore = () => {
  return (
    <motion.div
      className="absolute z-20 preserve-3d flex items-center justify-center"
      animate={{ 
        y: [-10, 10, -10],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* Core Glow */}
      <div className="absolute w-[300px] h-[300px] bg-brand-purple/20 blur-[60px] rounded-full pointer-events-none" />

      {/* Outer Gyroscopic Ring 1 */}
      <motion.div 
        className="absolute w-48 h-48 rounded-full border border-cyan-400/30 border-t-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.3)] preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: 360, rotateY: 180 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer Gyroscopic Ring 2 */}
      <motion.div 
        className="absolute w-40 h-40 rounded-full border border-purple-500/30 border-b-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.3)] preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: 180, rotateY: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Rotating Cube/Processor */}
      <motion.div
         className="relative w-20 h-20 bg-brand-dark/80 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-2xl preserve-3d"
         animate={{ 
           rotateX: [0, 360], 
           rotateY: [0, 360],
           rotateZ: [0, 90]
         }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
          {/* Cube Faces/Details */}
          <div className="absolute inset-0 border border-brand-purple/50 rounded-xl opacity-50" style={{ transform: "translateZ(10px)" }} />
          <div className="absolute inset-0 border border-accent-cyan/50 rounded-xl opacity-50" style={{ transform: "translateZ(-10px)" }} />
          
          {/* Central Logo */}
          <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-brand-purple to-violet-600 rounded-lg flex items-center justify-center text-white shadow-inner animate-pulse">
              <Cpu size={24} />
          </div>
      </motion.div>
    </motion.div>
  )
}

const Features: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden perspective-container">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white pointer-events-none" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-0 md:mb-10 relative z-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
             <Zap size={12} className="fill-current" /> Powerful Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
            Everything your clinic needs <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">to operate on autopilot</span>
          </h2>
        </motion.div>
        
        {/* Mobile View: Enhanced Marquee */}
        <div className="block md:hidden relative w-full overflow-hidden mt-12 py-4">
             {/* Using animate-marquee from updated Tailwind config */}
             <div className="flex gap-4 animate-marquee whitespace-nowrap w-max">
                {[...features, ...features].map((feature, index) => (
                    <div key={index} className="inline-block w-[220px] shrink-0">
                        <div className={`p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg border border-gray-100 bg-white h-[180px]`}>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm bg-gradient-to-br ${feature.color} text-white`}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-base font-bold text-brand-dark whitespace-normal">
                                {feature.title}
                            </h3>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* Desktop View: 3D Animated Orbit System */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="hidden md:flex relative w-full h-[800px] items-center justify-center -mt-20 preserve-3d"
        >
           {/* The Core */}
           <AICore />
           
           {/* Orbiting Container */}
           <div 
             className="relative w-[650px] h-[650px] preserve-3d will-change-transform"
             style={{ transform: "rotateX(65deg) rotateZ(-10deg)" }}
           >
              {/* Orbital Ring Visual */}
              <div className="absolute inset-0 rounded-full border border-gray-200/50" />
              <div className="absolute inset-4 rounded-full border border-dashed border-gray-200/30 animate-spin-slow" style={{ animationDuration: '40s' }} />

              <motion.div 
                 className="w-full h-full preserve-3d"
                 animate={{ rotateZ: 360 }}
                 transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                  {features.map((feature, index) => {
                    const angle = (360 / features.length) * index;
                    const radius = 325; // Distance from center
                    
                    return (
                      <div 
                        key={index}
                        className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center preserve-3d"
                        style={{ 
                          transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` 
                        }}
                      >
                        {/* Counter-rotate and Billboarding */}
                        <motion.div 
                           animate={{ rotateZ: -360 }}
                           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                           className="preserve-3d"
                        >
                            <motion.div 
                                style={{ transform: "rotateX(-65deg) rotateY(10deg)" }} // Counter tilt
                                whileHover={{ scale: 1.15, z: 40 }}
                                className="group cursor-pointer relative w-48 bg-white/90 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4 shadow-xl border border-white/50 hover:border-brand-purple/30 transition-all duration-300 backface-hidden"
                            >
                                {/* Floating 3D Icon */}
                                <div 
                                  className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-brand-purple/40`}
                                  style={{ transform: "translateZ(20px)" }}
                                >
                                  <feature.icon size={20} />
                                </div>
                                
                                <div className="text-left">
                                  <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-purple transition-colors">
                                    {feature.title}
                                  </h3>
                                  <div className="h-1 w-8 bg-gray-100 rounded-full mt-2 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-cyan-400 transition-all duration-500" />
                                </div>

                                {/* Connecting Line to Center (Visual only) */}
                                <div className="absolute top-1/2 -left-10 w-10 h-[1px] bg-gradient-to-r from-transparent to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </motion.div>
                      </div>
                    );
                  })}
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;