import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import { CERTIFICATIONS, EDUCATION } from '../constants';
import { Download, Eye, FileText, GraduationCap, CheckCircle2, Award } from 'lucide-react';

interface ResumeSectionProps {
  onOpenCvModal: () => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenCvModal }) => {
  return (
    <section id="resume" className="py-20 bg-slate-50/50 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Professional Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum Vitae & Summary
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A concise overview of verified education, technical skills, core systems, curriculum training, and certifications.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PORTFOLIO_CONFIG.cvUrl}
              download="Abdulfetah-Bedru-CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Download size={14} />
              <span>Download CV (.pdf)</span>
            </a>

            <button
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Eye size={14} className="text-purple-600 dark:text-purple-400" />
              <span>Interactive CV Preview</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Education */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                <GraduationCap size={16} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Education
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-900 dark:text-white leading-tight">
                BSc, Computer Science and Engineering
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Adama Science and Technology University (ASTU)
              </p>
              <span className="text-[10px] font-mono text-purple-700 dark:text-purple-400 block pt-1">
                2021 – 2025
              </span>
            </div>
          </div>

          {/* 2. Technical Scope */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                <FileText size={16} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Core Stack
              </h3>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <p><strong className="text-slate-900 dark:text-white">Backend:</strong> C#, .NET 10, ASP.NET Core</p>
              <p><strong className="text-slate-900 dark:text-white">Frontend:</strong> Angular, TypeScript, Signals</p>
              <p><strong className="text-slate-900 dark:text-white">Mobile:</strong> Flutter, Dart, REST APIs</p>
              <p><strong className="text-slate-900 dark:text-white">Database:</strong> PostgreSQL, EF Core 10</p>
              <p><strong className="text-slate-900 dark:text-white">Testing:</strong> xUnit, Moq, Playwright</p>
            </div>
          </div>

          {/* 3. Training & Curriculum */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                <CheckCircle2 size={16} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Technical Training
              </h3>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <p className="font-bold text-slate-900 dark:text-white leading-tight">
                .NET & Angular (12 Modules)
              </p>
              <p className="text-[11px]">
                Qiyas Advanced Digital Training · Addis Ababa University (2026–2027)
              </p>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block pt-1">
                Full-Stack Specialization
              </span>
            </div>
          </div>

          {/* 4. Certifications */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                <Award size={16} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Certifications
              </h3>
            </div>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <p className="truncate">● Cisco CCNAv7: Intro to Networks</p>
              <p className="truncate">● Cisco CCNAv7: Switching & Routing</p>
              <p className="truncate">● Cisco CCNAv7: Enterprise Automation</p>
              <p className="truncate">● Udacity: Data Analysis</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ResumeSection;
