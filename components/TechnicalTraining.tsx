import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../config/portfolio';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Layers, Terminal, Sparkles } from 'lucide-react';

const TechnicalTraining: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  const toggleModule = (modNum: number) => {
    setExpandedModule(prev => prev === modNum ? null : modNum);
  };

  return (
    <section id="training" className="py-20 bg-slate-50/50 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-mono font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded-full border border-purple-200/60 dark:border-purple-800/60">
            <BookOpen size={13} className="text-purple-600 dark:text-purple-400" />
            <span>Structured Technical Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Full-Stack Web Application Development with .NET & Angular
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A comprehensive 12-module technical training syllabus covering the entire stack—from modern C# and Entity Framework Core to reactive Angular Signals, OAuth security, and automated testing.
          </p>
          <div className="mt-4 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-700 dark:text-amber-400 max-w-xl mx-auto">
            Note: This section outlines formal curriculum mastery and technical coursework, distinguished from industry client engagements.
          </div>
        </div>

        {/* 12 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM_MODULES.map((module) => {
            const isExpanded = expandedModule === module.number;

            return (
              <div
                key={module.number}
                className={`rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-white dark:bg-[#0c121e] border-purple-400 dark:border-purple-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                      Module 0{module.number < 10 ? `0${module.number}` : module.number}
                    </span>
                    <button
                      onClick={() => toggleModule(module.number)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      aria-label={`Toggle module ${module.number} details`}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug mb-2">
                    {module.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {module.outcome}
                  </p>

                  {/* Expandable Topic Bullets */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 animate-fade-in">
                      <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 block mb-1">
                        Key Topics Covered:
                      </span>
                      {module.topics.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{t}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{module.topics.length} Key Competencies</span>
                  <button
                    onClick={() => toggleModule(module.number)}
                    className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                  >
                    {isExpanded ? 'Less' : 'Topics'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechnicalTraining;
