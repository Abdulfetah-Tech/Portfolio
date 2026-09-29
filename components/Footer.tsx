import React from 'react';
import { PORTFOLIO_CONFIG, NAV_LINKS } from '../config/portfolio';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/60 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-slate-800">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-700 text-white font-mono font-bold flex items-center justify-center text-sm">
              AB
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                {PORTFOLIO_CONFIG.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {PORTFOLIO_CONFIG.role} · .NET & Angular Systems
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              href={PORTFOLIO_CONFIG.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
              className="p-2 rounded-lg text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Scroll to top of page"
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Architecture Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. Engineered with React, TypeScript & Tailwind CSS.</p>
          <p className="text-[11px]">Strict Typing · Zero Slop · Production Standards</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
