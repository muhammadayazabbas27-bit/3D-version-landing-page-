import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, CalendarCheck, UserX, TrendingUp, Clock, ArrowRight, DollarSign, Users, CheckCircle2, Ban } from 'lucide-react';

interface GeneralProofProps {
  onTrialClick?: () => void;
}

const modules = [
  {
    icon: PhoneOff,
    title: "Stop Losing $200k+ a Year to Missed Calls.",
    body: "Your front desk is overwhelmed. Our AI answers 100% of calls, day or night, capturing every new patient lead you're currently missing.",
    stat: "Clients recover an average of $200,000 in lost revenue annually.",
    color: "text-red-500",
    bg: "bg-red-50"
  },
  {
    icon: CalendarCheck,
    title: "Boost New Patient Bookings by 20-30%.",
    body: "Our never-rushed, always-available agent expertly converts callers into booked appointments.",
    stat: "One practice saw a 67% jump by optimizing their AI's conversation flow.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: UserX,
    title: "Cut No-Shows by Up to 40%.",
    body: "Automated calls, texts, and confirmations keep patients informed and committed, maximizing daily revenue.",
    stat: "Result: Fuller schedules, higher team productivity.",
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    icon: TrendingUp,
    title: 'Get 25% More Patients to Say "Yes" to Treatment.',
    body: "AI follow-ups with clear info and visuals educate patients, boosting case acceptance for higher-value procedures.",
    stat: "Key Insight: \"Informed patients invest in their health.\"",
    color: "text-green-500",
    bg: "bg-green-50"
  },
  {
    icon: Clock,
    title: "Give Your Staff 16+ Hours a Week Back.",
    body: "No more phone tag or manual reminders. Free your team to focus on in-office care that drives referrals and retention.",
    stat: "Client Quote: \"We saved 16 hours a week just on follow-ups.\"",
    color: "text-brand-purple",
    bg: "bg-purple-50"
  }
];

const GeneralProof: React.FC<GeneralProofProps> = ({ onTrialClick }) => {
  const openBookingLink = () => {
    window.open('https://cal.com/denticall-ai/15min', '_blank');
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden perspective-container">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-brand-dark mb-6 leading-tight tracking-tight"
          >
            Turn Missed Calls Into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-600">30% More Practice Revenue</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium"
          >
            You got into dentistry to care for patients, not to run a call center. Our AI Voice Agent is your 24/7 revenue driver that captures every lead, fills your chair, and boosts your bottom line—automatically.
          </motion.p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2rem] border border-gray-100 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${mod.bg} ${mod.color} flex items-center justify-center mb-6 shadow-sm`}>
                <mod.icon size={28} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-4 leading-tight">
                {mod.title}
              </h3>
              
              <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
                {mod.body}
              </p>
              
              <div className={`mt-auto pt-6 border-t border-gray-50 text-sm font-bold ${mod.color} flex items-start gap-2`}>
                 <div className="mt-1 shrink-0"><CheckCircle2 size={16} /></div>
                 <span>{mod.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Verdict / Bottom-Line Summary */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[2.5rem] bg-brand-dark text-white p-8 md:p-16 relative overflow-hidden shadow-2xl text-center"
        >
           {/* Background Glow */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
           
           <div className="relative z-10">
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-bold uppercase tracking-wider mb-6">
                The Bottom Line
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                The Verdict: <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">14-30% Practice Growth</span>, Guaranteed.
              </h2>
              
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                When you capture every lead, fill more chairs, ensure patients show up, and secure more treatments—the math is simple. It’s not magic; it's automated efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button 
                   onClick={openBookingLink}
                   className="w-full sm:w-auto px-8 py-4 bg-white text-brand-dark font-bold text-lg rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
                 >
                    Show Me My Custom Revenue Projection <ArrowRight size={20} />
                 </button>
                 
                 <button 
                   onClick={onTrialClick}
                   className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-medium text-lg rounded-full hover:bg-white/5 transition-colors"
                 >
                    Get a taste with trial
                 </button>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GeneralProof;