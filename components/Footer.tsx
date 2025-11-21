import React from 'react';
import { PROFILE } from '../constants';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-dark text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-slate-700 pb-8">
          <div>
             <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
             <p className="text-slate-400 mb-4">
               I'm currently open to new opportunities in Full-Stack Development and Data Science.
             </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="group flex items-center hover:text-white transition-colors">
                <Mail size={16} className="mr-2 transition-transform group-hover:scale-110 group-hover:rotate-3" />
                <a href={`mailto:${PROFILE.email}`} className="transition-colors hover:underline">
                  {PROFILE.email}
                </a>
              </li>
              <li className="group flex items-center hover:text-white transition-colors">
                <Phone size={16} className="mr-2 transition-transform group-hover:scale-110 group-hover:-rotate-3" />
                <a href={`tel:${PROFILE.phone}`} className="transition-colors hover:underline">
                  {PROFILE.phone}
                </a>
              </li>
              <li className="group flex items-center hover:text-white transition-colors">
                 <MapPin size={16} className="mr-2 transition-transform group-hover:scale-110" />
                 <span>{PROFILE.location}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Socials</h4>
             <div className="flex space-x-4">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="group bg-slate-800 p-3 rounded-full hover:bg-white hover:text-dark transition-all">
                <Github size={20} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="group bg-slate-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                <Linkedin size={20} className="transition-transform group-hover:scale-110 group-hover:-rotate-6" />
                <ExternalLink size={16} className="transition-opacity opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Abdulfetah S. Bedru. All rights reserved.</p>
          <p className="mt-1">Built with React, Tailwind & Gemini AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;