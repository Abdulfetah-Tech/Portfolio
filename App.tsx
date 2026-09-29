import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechnicalSkills from './components/TechnicalSkills';
import FeaturedProjects from './components/FeaturedProjects';
import EngineeringApproach from './components/EngineeringApproach';
import ArchitectureSection from './components/ArchitectureSection';
import LearningJourney from './components/LearningJourney';
import TechnicalTraining from './components/TechnicalTraining';
import GitHubSection from './components/GitHubSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CvModal from './components/CvModal';
import ChatWidget from './components/ChatWidget';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-700 selection:text-white transition-colors duration-250">
        <Header onOpenCvModal={() => setIsCvModalOpen(true)} />
        
        <main>
          <Hero onOpenCvModal={() => setIsCvModalOpen(true)} />
          <About />
          <TechnicalSkills />
          <FeaturedProjects />
          <EngineeringApproach />
          <ArchitectureSection />
          <LearningJourney />
          <TechnicalTraining />
          <GitHubSection />
          <ResumeSection onOpenCvModal={() => setIsCvModalOpen(true)} />
          <ContactSection />
        </main>

        <Footer />
        <ChatWidget />
        <OfflineIndicator />
        <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
      </div>
    </ThemeProvider>
  );
};

export default App;
