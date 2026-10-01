import React, { useState } from 'react';
import { PORTFOLIO_CONFIG, WORK_EXPERIENCE, RESUME_SKILL_GROUPS } from '../config/portfolio';
import { EDUCATION, CERTIFICATIONS } from '../constants';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  MapPin, 
  Globe, 
  Phone, 
  Linkedin, 
  Github, 
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Layers,
  FileText,
  CheckCircle2,
  Terminal
} from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'standard' | 'extended'>('standard');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0c121e] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[94vh] overflow-y-auto relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 p-4 bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={15} />
              <span>Official Curriculum Vitae</span>
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">•</span>
            <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-mono">
              Abdulfetah Sultan Bedru
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono">
              <button
                onClick={() => setViewMode('standard')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  viewMode === 'standard'
                    ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1-Page Resume
              </button>
              <button
                onClick={() => setViewMode('extended')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  viewMode === 'extended'
                    ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Extended View
              </button>
            </div>

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

        {/* Paper Document Container (Designed to match the physical resume 1:1) */}
        <div className="p-6 sm:p-10 font-sans leading-normal bg-white dark:bg-[#0b101b] print:p-0">
          <div className="max-w-3xl mx-auto space-y-6 bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-xl shadow-xs print:border-none print:shadow-none print:p-0">
            
            {/* Header: Name, Title, Contact Grid */}
            <div className="text-center pb-5 border-b border-slate-900/80 dark:border-slate-700">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-950 dark:text-white uppercase font-sans">
                {PORTFOLIO_CONFIG.name}
              </h1>
              <p className="text-base sm:text-lg font-semibold text-purple-700 dark:text-purple-400 mt-1">
                {PORTFOLIO_CONFIG.role}
              </p>

              {/* Contact Information Bar */}
              <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 mt-3 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-sans">
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-purple-600 shrink-0" />
                  <a href={`mailto:${PORTFOLIO_CONFIG.email}`} className="hover:underline">{PORTFOLIO_CONFIG.email}</a>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-purple-600 shrink-0" />
                  <span>{PORTFOLIO_CONFIG.phone || '0940579561'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-purple-600 shrink-0" />
                  <span>{PORTFOLIO_CONFIG.location}</span>
                </span>
              </div>

              {/* Links Row */}
              <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 mt-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-mono">
                <a 
                  href={PORTFOLIO_CONFIG.portfolioUrl || "https://portfolio-kappa-gray-75.vercel.app"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Globe size={11} className="text-purple-600 shrink-0" />
                  <span>portfolio-kappa-gray-75.vercel.app</span>
                </a>
                <span>•</span>
                <a 
                  href={PORTFOLIO_CONFIG.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Linkedin size={11} className="text-blue-600 shrink-0" />
                  <span>linkedin.com/in/abdulfetah-sultan-99212227a</span>
                </a>
                <span>•</span>
                <a 
                  href={PORTFOLIO_CONFIG.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                >
                  <Github size={11} className="shrink-0" />
                  <span>github.com/{PORTFOLIO_CONFIG.githubUsername}</span>
                </a>
                <span>•</span>
                <a 
                  href={PORTFOLIO_CONFIG.leetcode || "https://leetcode.com/u/Abdulfetah_Sultan"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <Code2 size={11} className="text-amber-500 shrink-0" />
                  <span>leetcode.com/u/Abdulfetah_Sultan</span>
                </a>
              </div>
            </div>

            {/* SECTION 1: PROFESSIONAL SUMMARY */}
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900/90 dark:border-slate-700 pb-1 mb-2 font-mono flex items-center justify-between">
                <span>Professional Summary</span>
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-sans">
                {PORTFOLIO_CONFIG.aboutText}
              </p>
            </div>

            {/* SECTION 2: PROFESSIONAL EXPERIENCE */}
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900/90 dark:border-slate-700 pb-1 mb-3 font-mono">
                Professional Experience
              </h2>
              
              <div className="space-y-4">
                {/* Sheger system */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-[13px]">
                    <div>
                      <h3 className="font-bold text-slate-950 dark:text-white">Software Developer</h3>
                      <p className="text-xs italic text-slate-600 dark:text-slate-400 font-serif">Sheger system</p>
                    </div>
                    <div className="text-right font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                      <div>08/2020 – 10/2025</div>
                      <div className="italic font-sans">Addis Ababa</div>
                    </div>
                  </div>
                  {viewMode === 'extended' && (
                    <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
                      <li>Designed and deployed enrollment logic integrating delegate-driven software layers for cross-module synchronization and multi-tier student data orchestration.</li>
                      <li>Implemented an event-driven notification component implementing the C# Delegate pattern to decouple SMS/system messaging flows from primary transactional databases.</li>
                    </ul>
                  )}
                </div>

                {/* NEO AI Technologies */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-[13px]">
                    <div>
                      <h3 className="font-bold text-slate-950 dark:text-white">Web Developer</h3>
                      <p className="text-xs italic text-slate-600 dark:text-slate-400 font-serif">NEO AI Technologies</p>
                    </div>
                    <div className="text-right font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                      <div>08/2023 – 11/2023</div>
                      <div className="italic font-sans">Addis Ababa</div>
                    </div>
                  </div>
                  {viewMode === 'extended' && (
                    <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
                      <li>Built dynamic web applications with responsive design and modern frontend frameworks.</li>
                      <li>Successfully integrated dynamic user interfaces with backend databases, ensuring seamless data flow and enhancing user experience.</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: EDUCATION & TRAINING */}
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900/90 dark:border-slate-700 pb-1 mb-3 font-mono">
                Education & Training
              </h2>
              
              <div className="space-y-3 text-xs sm:text-[13px]">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-white">
                      Bachelor of Science - BSc, Computer Science and Engineering
                    </h3>
                    <p className="text-xs italic text-slate-600 dark:text-slate-400 font-serif">
                      Adama Science and Technology University
                    </p>
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                    06/2020 – 06/2025
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-white">
                      Advanced Digital Skill Training in Full-Stack Software Development
                    </h3>
                    <p className="text-xs italic text-slate-600 dark:text-slate-400 font-serif">
                      Addis Ababa University
                    </p>
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                    01/2026 – Present
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 4: TECHNICAL SKILLS (2-column layout matching physical resume) */}
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900/90 dark:border-slate-700 pb-1 mb-3 font-mono">
                Technical Skills
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Column 1 */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-0.5">Frontend Development</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      HTML5, CSS3, JavaScript, Angular, React, UI/UX Implementation, Responsive Design
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-0.5">Architecture & Infrastructure</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      API Development, Notification Integrations (SMS/Delegate Patterns), Event-Driven Architecture
                    </p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-0.5">Backend & Software Systems</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      C#, .NET SDK, Scala, Functional Programming, psql (PostgreSQL), Asynchronous Programming
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-0.5">Tools & Development Ecosystem</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Linux Terminal, Git/GitHub, VS Code, Environment Provisioning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 5: KEY PROJECTS */}
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900/90 dark:border-slate-700 pb-1 mb-3 font-mono">
                Key Projects
              </h2>

              <div className="space-y-4 text-xs">
                {/* TMS Backend Suite */}
                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-xs sm:text-[13px]">
                    Training Management System (TMS) Backend Suite
                  </h3>
                  <ul className="mt-1 space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc leading-relaxed text-justify">
                    <li>
                      Designed and deployed enrollment logic integrating delegate-driven software layers for cross-module synchronization and multi-tier student data orchestration.
                    </li>
                    <li>
                      Implemented an event-driven notification component implementing the C# Delegate pattern to decouple SMS/system messaging flows from primary transactional databases.
                    </li>
                  </ul>
                </div>

                {/* OneGov */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-slate-950 dark:text-white text-xs sm:text-[13px]">
                      OneGov-Unified E-Government Service Platform
                    </h3>
                  </div>
                  <p className="text-[11px] italic text-slate-600 dark:text-slate-400 font-serif mb-1">
                    Full-Stack Developer
                  </p>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc leading-relaxed text-justify">
                    <li>
                      Contributed to a national digital platform integrating government services into a single portal, enhancing efficiency, transparency, and citizen access through secure digital identity and streamlined workflows.
                    </li>
                  </ul>
                </div>

                {/* Fetan Digital Platform */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-slate-950 dark:text-white text-xs sm:text-[13px]">
                      Fetan Digital Platform for Home Renovation and Maintenance Expert
                    </h3>
                  </div>
                  <p className="text-[11px] italic text-slate-600 dark:text-slate-400 font-serif mb-1">
                    Frontend Developer and Data base Integration
                  </p>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc leading-relaxed text-justify">
                    <li>
                      As a frontend developer, I successfully integrated dynamic user interfaces with backend databases, ensuring seamless data flow and enhancing user experience. My contributions included optimizing performance, implementing responsive designs, and utilizing APIs for efficient data retrieval and manipulation. This resulted in improved application responsiveness and user satisfaction.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Extended Training view if toggled */}
            {viewMode === 'extended' && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 font-mono">
                  Additional Certifications & Credentials
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {CERTIFICATIONS.map((cert) => (
                    <div key={cert.id} className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                      <span className="font-semibold block text-slate-900 dark:text-white">{cert.title}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{cert.issuer} • {cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default CvModal;
