import React from 'react';
import { PORTFOLIO_CONFIG, WORK_EXPERIENCE, RESUME_SKILL_GROUPS } from '../config/portfolio';
import { EDUCATION } from '../constants';
import { 
  Download, 
  Eye, 
  FileText, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  Code2, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ExternalLink,
  Github,
  Linkedin
} from 'lucide-react';

interface ResumeSectionProps {
  onOpenCvModal: () => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenCvModal }) => {
  return (
    <section id="resume" className="py-20 bg-slate-50/50 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Curriculum Vitae & Verified Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Resume & Professional Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Official career record spanning commercial development at Sheger system & NEO AI Technologies, computer science engineering education, and key enterprise project deliverables.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PORTFOLIO_CONFIG.cvUrl}
              download="Abdulfetah-Bedru-CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Download size={14} />
              <span>Download Resume PDF</span>
            </a>

            <button
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Eye size={14} className="text-purple-600 dark:text-purple-400" />
              <span>Interactive CV Preview</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* 1. Professional Experience */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                  <Briefcase size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Experience
                </h3>
              </div>
              <div className="space-y-3 text-xs">
                {WORK_EXPERIENCE.map((exp) => (
                  <div key={exp.id} className="pb-2 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0 last:pb-0">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight">
                      {exp.role}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 italic">
                      {exp.company}
                    </p>
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 block pt-0.5">
                      {exp.period} • {exp.location}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Education & Training */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                  <GraduationCap size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Education & Training
                </h3>
              </div>
              <div className="space-y-3 text-xs">
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className="pb-2 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0 last:pb-0">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight">
                      {edu.degree}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 italic">
                      {edu.school}
                    </p>
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 block pt-0.5">
                      {edu.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Technical Skills (Grouped as on Resume) */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                  <Code2 size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Core Proficiencies
                </h3>
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <strong className="text-slate-900 dark:text-white block text-[11px]">Backend & Systems:</strong>
                  <span className="text-[11px] font-mono">C#, .NET SDK, Scala, psql (PostgreSQL)</span>
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block text-[11px]">Frontend Development:</strong>
                  <span className="text-[11px] font-mono">Angular, React, HTML5, CSS3, JS</span>
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block text-[11px]">Architecture:</strong>
                  <span className="text-[11px] font-mono">Event-Driven, APIs, Delegate Patterns</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Key Projects */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                  <FileText size={16} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Key Projects
                </h3>
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-[11px]">
                    TMS Backend Suite
                  </p>
                  <p className="text-[10px] text-slate-500">Multi-tier student data & event notifications</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-[11px]">
                    OneGov E-Government Platform
                  </p>
                  <p className="text-[10px] text-slate-500">National digital services & SSO workflow</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-[11px]">
                    Fetan Digital Platform
                  </p>
                  <p className="text-[10px] text-slate-500">Trade marketplace & database integration</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Strip */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
              <Mail size={13} className="text-purple-600" />
              <span>{PORTFOLIO_CONFIG.email}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
              <Phone size={13} className="text-purple-600" />
              <span>{PORTFOLIO_CONFIG.phone || '0940579561'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-purple-600" />
              <span>{PORTFOLIO_CONFIG.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_CONFIG.portfolioUrl || "https://portfolio-kappa-gray-75.vercel.app"}
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>portfolio-kappa-gray-75.vercel.app</span>
              <ExternalLink size={11} />
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href={PORTFOLIO_CONFIG.leetcode || "https://leetcode.com/u/Abdulfetah_Sultan"}
              target="_blank"
              rel="noreferrer"
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>LeetCode</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResumeSection;
