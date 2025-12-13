// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import Hero from './components/Hero';
import ChristmasSpecial from './components/ChristmasSpecial';
import USP from './components/USP';
import Stats from './components/Stats';
import Process from './components/Process';
import Features from './components/Features'; 
import Footer from './components/Footer';
import Personas from './components/Personas';
import PainPoints from './components/PainPoints';
import FinalCTA from './components/FinalCTA';
import ChristmasTrialPage from './components/ChristmasTrialPage';
import ComparisonSection from './components/ComparisonSection';
import GeneralProof from './components/GeneralProof';
import MindsBehind from './components/MindsBehind';
import SystemBreakdown from './components/SystemBreakdown';
import Testimonials from './components/Testimonials';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeTab, setActiveTab] = useState('');

  // Global Mouse 3D Effect Helper
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const navItems = [
    { name: 'Our Process', id: 'process' },
    { name: 'Why Us', id: 'pain-points' },
    { name: 'See This', id: 'stats' },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openBookingLink = () => {
    window.open('https://cal.com/denticall-ai/15min', '_blank');
  };

  const handleTrialClick = () => {
    navigate('/christmas-trial');
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans antialiased text-brand-dark bg-white selection:bg-brand-purple selection:text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-accent-cyan origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Header - Pill Style */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 pointer-events-none perspective-container">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="max-w-5xl mx-auto flex justify-between items-center"
        >
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="pointer-events-auto flex items-center gap-2 cursor-pointer group glass-panel px-4 py-2 rounded-2xl shadow-lg shadow-black/5 transform transition-transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-violet-600 rounded-lg flex items-center justify-center text-white shadow-inner">
              <Activity size={18} />
            </div>
            <div className="font-heading font-bold text-lg tracking-tight text-brand-dark">
              Denti<span className="text-[#8b5cf6]">Call</span>
            </div>
          </div>

          {/* Navigation Pill */}
          <div className="pointer-events-auto hidden md:block preserve-3d">
            <nav className="flex items-center gap-1 px-2 py-2 bg-white/80 backdrop-blur-xl border border-white/40 rounded-full shadow-xl shadow-gray-200/50">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${activeTab === item.id 
                      ? 'text-brand-purple bg-brand-purple/10 font-bold' 
                      : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'
                    }
                  `}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* CTA Button */}
          <motion.button 
            whileHover={{ scale: 1.05, z: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={openBookingLink}
            className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-brand-dark text-white text-sm font-semibold hover:bg-black transition-all shadow-xl shadow-brand-dark/20"
          >
            Get a Free Trial
          </motion.button>
        </motion.div>
      </header>

      <main>
        {/* 1. Hero Section */}
        <div id="hero">
          <Hero mouseX={mouseX} mouseY={mouseY} />
        </div>

        {/* 1.5. Christmas Special Section - Passes handler */}
        <div id="christmas-special">
          <ChristmasSpecial onTrialClick={handleTrialClick} />
        </div>
        
        {/* 2. Core Problems Solved */}
        <div id="pain-points">
          <PainPoints />
        </div>

        {/* 2.5 New System Breakdown Section */}
        <div id="how-it-works">
          <SystemBreakdown />
        </div>
        
        {/* 3. Real Data from Industry */}
        <div id="stats">
          <Stats />
        </div>

        {/* 3.5 General Proof Section */}
        <div id="general-proof">
          <GeneralProof onTrialClick={handleTrialClick} />
        </div>
        
        {/* 4. Unique Advantage */}
        <div id="usp">
           {/* Combining Features (Grid) and USP (Comparison) for "Unique Advantage" */}
           <Features />
           <USP />
           <ComparisonSection />
        </div>
        
        {/* 5. Built for Everyone */}
        <div id="personas">
          <Personas />
        </div>
        
        {/* 6. Go Live in 4 Steps */}
        <div id="process">
          <Process />
        </div>

        {/* 6.5 Testimonials Section */}
        <div id="testimonials">
          <Testimonials />
        </div>

        {/* 7. Final CTA */}
        <div id="final-cta">
          <FinalCTA />
        </div>

        {/* 7.5 Minds Behind (Team) */}
        <div id="team">
          <MindsBehind />
        </div>
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/christmas-trial" element={<ChristmasTrialPage onBack={() => navigate('/')} />} />
    </Routes>
  );
};

export default App;