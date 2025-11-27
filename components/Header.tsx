import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'AI & ML', href: '#ai-ml' },
    { label: 'Skills', href: '#skills' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl font-bold text-primary tracking-tight group">
              ASB<span className="text-secondary inline-block transition-transform group-hover:bounce">.</span>
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-200">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="group text-gray-500 hover:text-black transition-colors">
                <Github size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="group text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary focus:outline-none transition-transform hover:scale-105 active:scale-95"
            >
              {isMenuOpen ? (
                <X size={24} className="transition-transform duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Menu size={24} className="transition-transform duration-300 hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-purple-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex space-x-4 px-3 py-2 mt-2 border-t border-gray-100">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black">
                <Github size={20} className="transition-transform hover:scale-110" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600">
                <Linkedin size={20} className="transition-transform hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;