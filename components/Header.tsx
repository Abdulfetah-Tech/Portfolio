import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG, NAV_LINKS } from '../config/portfolio';
import { useTheme } from '../context/ThemeContext';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenCvModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCvModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-250 ${
        isScrolled
          ? 'bg-[#090d16]/90 dark:bg-[#090d16]/90 bg-white/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo: AB Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-1"
            aria-label="Abdulfetah Bedru - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-700 text-white font-mono font-bold flex items-center justify-center text-sm tracking-wider shadow-sm group-hover:bg-purple-600 transition-colors">
              AB
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {PORTFOLIO_CONFIG.name}
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
                Full-Stack Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={onOpenCvModal}
              className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200/80 dark:border-purple-800/60 rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              CV <ArrowUpRight size={12} />
            </button>
          </nav>

          {/* Right Controls: Install Button, Socials & Theme Toggle */}
          <div className="hidden sm:flex items-center space-x-2">
            <PWAInstallButton />

            <a
              href={PORTFOLIO_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>

            <a
              href={PORTFOLIO_CONFIG.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-amber-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={17} className="transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon size={17} className="transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls: PWA, Theme Toggle & Hamburger Menu */}
          <div className="flex sm:hidden items-center gap-1.5">
            <PWAInstallButton />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-amber-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all">
          <div className="px-4 pt-2 pb-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenCvModal();
                }}
                className="px-3 py-2 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded-md border border-purple-200 dark:border-purple-800/60"
              >
                View CV Preview
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={PORTFOLIO_CONFIG.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={PORTFOLIO_CONFIG.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
