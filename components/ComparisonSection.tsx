// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, XCircle, Phone, MessageCircle, Bot, Calendar, 
  Database, ShieldCheck, Zap, AlertTriangle, Mic, Plug, CalendarX,
  PhoneForwarded, LayoutDashboard, Lock, FileCheck, Rocket, Globe,
  UserX, ShieldAlert, FileX, Clock, Bell, PhoneOff
} from 'lucide-react';

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white perspective-container">
      
      {/* --- FESTIVE BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Animated Waves */}
        <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <motion.path 
             fill="url(#festiveGradient)" 
             d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
             animate={{ 
               d: [
                 "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                 "M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,224C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                 "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
               ] 
             }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           />
           <defs>
             <linearGradient id="festiveGradient" x1="0" y1="0" x2="1" y2="0">
               <stop offset="0%" stopColor="#fee2e2" /> {/* red-100 */}
               <stop offset="50%" stopColor="#dcfce7" /> {/* green-100 */}
               <stop offset="100%" stopColor="#fef3c7" /> {/* amber-100 */}
             </linearGradient>
           </defs>
        </svg>

        {/* Floating Particles (Red, Green, Gold) */}
        {[...Array(20)].map((_, i) => {
           const colors = ['bg-red-400', 'bg-emerald-400', 'bg-amber-400'];
           const color = colors[i % 3];
           const size = Math.random() * 6 + 2;
           return (
             <motion.div
               key={i}
               className={`absolute rounded-full ${color} opacity-40 blur-[1px]`}
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 width: size,
                 height: size,
               }}
               animate={{
                 y: [0, -30, 0],
                 opacity: [0.3, 0.6, 0.3],
                 scale: [1, 1.2, 1]
               }}
               transition={{
                 duration: 5 + Math.random() * 5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: Math.random() * 2
               }}
             />
           );
        })}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
            Why Clinics Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-600">The Complete System</span>
          </h2>
          <p className="text-gray-500 text-lg">One system built for long-term dental growth, not short-term automation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto perspective-container">
          
          {/* --- LEFT COLUMN: OUR SYSTEM (PREMIUM 3D) --- */}
          <div className="relative group perspective-container">
             {/* 3D Background Card with Holiday Glow */}
             <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/30 to-green-50/30 rounded-[2.5rem] border border-red-100/50 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]" />
             
             {/* Glowing Border Animation */}
             <div className="absolute inset-0 rounded-[2.5rem] border border-transparent bg-gradient-to-r from-red-400/20 via-gold-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

             <div className="relative p-6 md:p-12 z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                   <motion.div 
                     className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-violet-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20"
                     animate={{ rotateY: 360 }}
                     transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   >
                      <Bot size={32} />
                   </motion.div>
                   <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">DentiCall AI</h3>
                      <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider">Complete System</span>
                   </div>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                   {[
                     { 
                       text: "Voice AI + Chat AI", 
                       icon: (
                         <div className="relative w-10 h-10 flex items-center justify-center">
                            <Phone size={20} className="text-brand-purple absolute left-0 top-0" />
                            <MessageCircle size={20} className="text-accent-cyan absolute right-0 bottom-0" />
                         </div>
                       ) 
                     },
                     { 
                       text: "Phone, WhatsApp, Messenger, Instagram & Website", 
                       icon: <Globe size={24} className="text-blue-500" />
                     },
                     { 
                       text: "Connects with your clinic's software", 
                       icon: <Database size={24} className="text-indigo-500" />
                     },
                     { 
                       text: "Sends automatic reminders & follow-ups", 
                       icon: <Bell size={24} className="text-yellow-500 fill-yellow-500" />
                     },
                     { 
                       text: "Books, reschedules & cancels appointments 24/7", 
                       icon: <Calendar size={24} className="text-green-500" />
                     },
                     {
                       text: "Human transfer",
                       icon: <PhoneForwarded size={24} className="text-purple-500" />
                     },
                     {
                       text: "Emergency handling",
                       icon: <AlertTriangle size={24} className="text-red-500" />
                     },
                     {
                       text: "Custom Branded Dashboard",
                       icon: <LayoutDashboard size={24} className="text-cyan-500" />
                     },
                     {
                       text: "100% customer data protection",
                       icon: <ShieldCheck size={24} className="text-emerald-500" />
                     },
                     {
                       text: "Insurance verification",
                       icon: <FileCheck size={24} className="text-blue-400" />
                     },
                     {
                       text: "Setup takes only 7-14 days",
                       icon: <Rocket size={24} className="text-orange-500" />
                     }
                   ].map((item, i) => (
                     <motion.div 
                       key={i}
                       className="flex items-center gap-4 p-3 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-sm hover:shadow-md hover:bg-white/80 transition-all cursor-default group/item"
                       whileHover={{ x: 5 }}
                     >
                        {/* 3D Icon Container */}
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-inner group-hover/item:scale-110 transition-transform duration-300">
                           {item.icon}
                        </div>
                        
                        <div className="flex-1">
                           <h4 className="font-bold text-brand-dark text-sm md:text-base leading-tight">{item.text}</h4>
                        </div>

                        {/* Animated Checkmark */}
                        <div className="w-6 h-6 shrink-0 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm group-hover/item:bg-green-500 group-hover/item:text-white transition-colors">
                           <CheckCircle2 size={14} />
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </div>

          {/* --- RIGHT COLUMN: COMPETITOR (FLAT & BASIC) --- */}
          <div className="relative h-full">
             <div className="absolute inset-0 bg-gray-50/80 rounded-[2.5rem] border border-gray-200" />
             
             <div className="relative p-6 md:p-12 z-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 grayscale">
                   <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-500">
                      <Mic size={32} />
                   </div>
                   <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-600">Basic Voice Agents</h3>
                      <span className="text-sm font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full uppercase tracking-wider">Competitors</span>
                   </div>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                   {[
                     { text: "Only Voice (No chat)", icon: <Mic size={24} className="text-gray-400" /> },
                     { text: "No WhatsApp/Messenger", icon: <MessageCircle size={24} className="text-gray-300" /> },
                     { text: "No automatic reminders and follow-ups", icon: <CalendarX size={24} className="text-gray-300" /> },
                     { text: "Only book appointments (no reschedule/cancel)", icon: <Calendar size={24} className="text-gray-400" /> },
                     { text: "No human transfer", icon: <UserX size={24} className="text-gray-400" /> },
                     { text: "No Emergency handling", icon: <AlertTriangle size={24} className="text-red-300" /> },
                     { text: "No dashboard", icon: <LayoutDashboard size={24} className="text-gray-300" /> },
                     { text: "Zero protection", icon: <ShieldAlert size={24} className="text-red-300" /> },
                     { text: "Setup takes 4 weeks", icon: <Clock size={24} className="text-gray-400" /> },
                     { text: "No Insurance verification", icon: <FileX size={24} className="text-gray-400" /> }
                   ].map((item, i) => (
                     <div 
                       key={i}
                       className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-gray-200 transition-colors"
                     >
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                           {item.icon}
                        </div>
                        
                        <div className="flex-1">
                           <h4 className="font-medium text-gray-500 text-sm md:text-base leading-tight">{item.text}</h4>
                        </div>

                        <div className="w-6 h-6 shrink-0 rounded-full bg-red-50 flex items-center justify-center text-red-300">
                           <XCircle size={14} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;