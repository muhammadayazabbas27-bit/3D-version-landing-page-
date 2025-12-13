import React from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneCall, MessageCircle, CalendarCheck, Bell, ShieldCheck, 
  LayoutDashboard, PlugZap, TrendingUp, Clock, Heart, ArrowRight,
  Database, Lock, Globe, Smartphone, Mail, CheckCircle2
} from 'lucide-react';

const WorkflowNode = ({ icon: Icon, title, points, color, delay, isLast }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6 }}
      className="relative flex gap-6 md:gap-10 pb-16 md:pb-20 last:pb-0"
    >
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[28px] top-[60px] bottom-0 w-1 bg-gray-100">
           <motion.div 
             initial={{ height: 0 }}
             whileInView={{ height: "100%" }}
             viewport={{ once: true }}
             transition={{ delay: delay + 0.3, duration: 1, ease: "linear" }}
             className={`w-full h-full bg-gradient-to-b ${color}`}
           />
        </div>
      )}

      {/* Icon Node */}
      <div className="relative z-10">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-gray-100 shadow-xl flex items-center justify-center relative group">
           <div className={`absolute inset-0 bg-current opacity-5 rounded-2xl ${color.split(' ')[1]}`} />
           <Icon size={28} className={color.split(' ')[1].replace('to-', 'text-')} />
           
           {/* Pulse Effect */}
           <div className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-current ${color.split(' ')[1]}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
         <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-4">{title}</h3>
         <div className="space-y-4">
            {points.map((point: any, i: number) => (
              <div key={i} className="bg-gray-50 hover:bg-white p-4 rounded-xl border border-gray-100 hover:border-brand-purple/20 transition-all shadow-sm hover:shadow-md">
                 <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                   <strong className="text-brand-dark block mb-1">{point.head}</strong>
                   {point.desc}
                 </p>
              </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow group"
  >
    <div className="w-12 h-12 bg-brand-purple/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-purple group-hover:text-white transition-colors text-brand-purple">
      <Icon size={24} />
    </div>
    <h4 className="font-bold text-brand-dark mb-2">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

const SystemBreakdown: React.FC = () => {
  const openBookingLink = () => {
    window.open('https://cal.com/denticall-ai/30min', '_blank');
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden perspective-container">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-purple-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-blue-50 to-transparent rounded-tr-full opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="max-w-4xl mx-auto text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/5 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider mb-6"
           >
             <PlugZap size={14} /> System Architecture
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight"
           >
             Turn Every Patient Interaction <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-600">Into Revenue</span>
           </motion.h2>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg md:text-xl text-gray-500 leading-relaxed"
           >
             We don't just manage communication—we capture, convert, and care for every patient.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
           
           {/* --- LEFT: THE ENGINE (WORKFLOW) --- */}
           <div>
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">The Patient Conversion Engine</h3>
                <p className="text-gray-500">Automated workflow that runs while you sleep.</p>
              </div>

              <div className="relative pl-4">
                 <WorkflowNode 
                    icon={PhoneCall}
                    title="1. Capture Every Opportunity"
                    color="from-blue-400 to-blue-600"
                    delay={0.1}
                    points={[
                      { head: "24/7 Response:", desc: "Answers every call instantly. Never miss a patient to a busy signal or after-hours." },
                      { head: "Omni-Channel Hub:", desc: "Engages on Phone, WhatsApp, Messenger, Instagram & Email simultaneously." }
                    ]}
                 />
                 <WorkflowNode 
                    icon={CalendarCheck}
                    title="2. Convert to Appointment"
                    color="from-purple-400 to-purple-600"
                    delay={0.3}
                    points={[
                      { head: "Intelligent Qualification:", desc: "Qualifies callers and answers FAQs intelligently." },
                      { head: "Real-Time Booking:", desc: "Schedules appointments directly into your existing calendar software." }
                    ]}
                 />
                 <WorkflowNode 
                    icon={Heart}
                    title="3. Retain & Build Loyalty"
                    color="from-pink-400 to-pink-600"
                    delay={0.5}
                    isLast={true}
                    points={[
                      { head: "Zero No-Shows:", desc: "Automated SMS/Voice reminders ensure commitment." },
                      { head: "Patient Care:", desc: "Personalized pre- and post-appointment follow-ups boost satisfaction." }
                    ]}
                 />
              </div>
           </div>

           {/* --- RIGHT: CONTROL & OUTCOME --- */}
           <div className="space-y-8 sticky top-24">
              
              {/* Control Grid */}
              <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100">
                 <h3 className="text-2xl font-bold text-brand-dark mb-8">Complete Control at Your Fingertips</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureCard 
                      icon={LayoutDashboard}
                      title="Command Center"
                      desc="Track live conversations, call recordings, and performance metrics in one branded dashboard."
                      delay={0.2}
                    />
                    <FeatureCard 
                      icon={Database}
                      title="Seamless Integration"
                      desc="Connects with Dentrix, OpenDental, and more for accurate history and context."
                      delay={0.3}
                    />
                    <FeatureCard 
                      icon={ShieldCheck}
                      title="Enterprise Security"
                      desc="HIPAA compliant infrastructure ensuring max patient data privacy."
                      delay={0.4}
                    />
                    <FeatureCard 
                      icon={Globe}
                      title="Multi-Platform"
                      desc="Unified inbox for Voice, SMS, Email, and Social Media."
                      delay={0.5}
                    />
                 </div>
              </div>

              {/* ROI Promise Card */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="bg-brand-dark text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl group"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-[80px] group-hover:bg-brand-purple/30 transition-colors" />
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-white/10 rounded-lg"><TrendingUp size={24} className="text-green-400" /></div>
                       <h3 className="text-xl font-bold">The Ultimate Outcome</h3>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                       <li className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-1" />
                          <span className="text-gray-200"><strong className="text-white">Guaranteed Growth:</strong> Reclaim 20-30% of lost revenue.</span>
                       </li>
                       <li className="flex items-start gap-3">
                          <Clock size={20} className="text-blue-400 shrink-0 mt-1" />
                          <span className="text-gray-200"><strong className="text-white">Reclaim Time:</strong> Free staff from phone tag to focus on care.</span>
                       </li>
                       <li className="flex items-start gap-3">
                          <Heart size={20} className="text-pink-400 shrink-0 mt-1" />
                          <span className="text-gray-200"><strong className="text-white">Elevate Experience:</strong> Modern, responsive care patients love.</span>
                       </li>
                    </ul>

                    <button 
                       onClick={openBookingLink}
                       className="w-full py-4 bg-white text-brand-dark font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                       Grow Your Practice Now <ArrowRight size={18} />
                    </button>
                 </div>
              </motion.div>

           </div>
        </div>
      </div>
    </section>
  );
};

export default SystemBreakdown;