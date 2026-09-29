import React from 'react';
import { PORTFOLIO_CONFIG, SKILL_CATEGORIES, FEATURED_PROJECTS } from '../config/portfolio';
import { CERTIFICATIONS, EDUCATION } from '../constants';
import { X, Download, Printer, Mail, MapPin, Globe, CheckCircle2, ExternalLink } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0c121e] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
              Curriculum Vitae Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Print CV"
            >
              <Printer size={15} />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href={PORTFOLIO_CONFIG.cvUrl}
              download="Abdulfetah-Bedru-CV.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 transition-colors shadow-2xs"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close CV preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CV Document Content */}
        <div className="p-6 sm:p-10 space-y-8 print:p-0 print:space-y-4">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {PORTFOLIO_CONFIG.name}
            </h1>
            <p className="text-base font-semibold text-purple-700 dark:text-purple-400 mt-1">
              {PORTFOLIO_CONFIG.role}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {PORTFOLIO_CONFIG.aboutText}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-purple-600" /> {PORTFOLIO_CONFIG.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-purple-600" /> {PORTFOLIO_CONFIG.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={13} className="text-purple-600" /> github.com/{PORTFOLIO_CONFIG.githubUsername}
              </span>
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    {cat.category}:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px]">
                    {cat.category === 'Mobile Development'
                      ? 'Flutter, Dart, Cross-platform Application Development, REST API Integration'
                      : cat.skills.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">{edu.school}</p>
                  </div>
                  <span className="font-mono text-slate-500">{edu.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Projects */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
              Engineered Projects & Systems
            </h2>
            <div className="space-y-4">
              {FEATURED_PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-[11px] text-purple-700 dark:text-purple-400">
                      {proj.subtitle}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.problemSolved}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
                    Stack: {proj.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Training */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
              Technical Training & Certifications
            </h2>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Full-Stack Web Application Development with .NET & Angular (12 Modules)
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5 font-mono">
                  Qiyas Advanced Digital Training · Addis Ababa University (2026–2027)
                </p>
              </div>

              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center text-xs py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{cert.title}</span>
                  <span className="font-mono text-slate-500 text-[11px]">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CvModal;
