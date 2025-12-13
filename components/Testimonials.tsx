import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, UserCheck } from 'lucide-react';

const testimonials = [
  {
    title: "On Recovering $200k+ in Lost Revenue & No-Shows",
    quote: "Implementing this AI system was a financial turning point. We're now recovering over $200,000 annually from calls we used to miss completely. The automated reminders have also slashed our no-show rate, ensuring that the revenue we capture actually makes it to the schedule. It's a double win for our bottom line.",
    role: "Dental Practice Owner"
  },
  {
    title: "On Saving 16+ Hours & Increasing Revenue",
    quote: "The biggest win is how it gave my team over 16 hours back each week by automating calls and reminders. That saved time translates directly into better patient care and focus on growth. Plus, with no-shows down significantly and more leads captured, we've seen a clear, steady increase in overall monthly revenue.",
    role: "Clinic Manager"
  },
  {
    title: "On Boosting Patient Satisfaction & Revenue",
    quote: "Our patient satisfaction scores have improved because no call goes unanswered and everyone receives perfect reminders, cutting down on missed appointments. This reliable, professional communication builds trust. Happy patients are more likely to commit to treatment, which has directly increased our case acceptance and revenue per patient.",
    role: "Orthodontist"
  },
  {
    title: "On a 67% Jump in Bookings & Reducing No-Shows",
    quote: "After optimizing the AI's conversation flow, our new patient bookings skyrocketed by 67%. The system doesn't just book them; it keeps them committed. The integrated confirmation system has dramatically reduced last-minute cancellations and no-shows, so those booked appointments actually turn into fulfilled revenue.",
    role: "Operations Director"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-brand-gray relative overflow-hidden perspective-container">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-brand-purple text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
          >
            <Star size={12} className="fill-current" /> Success Stories
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-brand-dark mb-6"
          >
            See What <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-600">People Say</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 relative group"
            >
              <div className="absolute top-8 right-8 text-brand-purple/10 group-hover:text-brand-purple/20 transition-colors">
                <Quote size={48} className="fill-current" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-brand-dark mb-4 pr-12 leading-tight">
                  {t.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-violet-500 flex items-center justify-center text-white shadow-md">
                      <UserCheck size={20} />
                   </div>
                   <div>
                      <div className="font-bold text-brand-dark">Verified Client</div>
                      <div className="text-xs text-brand-purple font-bold uppercase tracking-wide">{t.role}</div>
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

export default Testimonials;