import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Projects from './components/Projects';
import AIProjects from './components/AIProjects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <div className="space-y-0">
          <Experience />
          <Projects />
          <AIProjects />
          <Skills />
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;