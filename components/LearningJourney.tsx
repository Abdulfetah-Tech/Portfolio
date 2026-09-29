import React from 'react';
import { JOURNEY_MILESTONES } from '../config/portfolio';
import { GraduationCap, ArrowDown, CheckCircle2 } from 'lucide-react';

const LearningJourney: React.FC = () => {
  return (
    <section id="journey" className="py-20 bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Engineering Trajectory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Learning Journey & Progression
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            The systematic evolution of my engineering capabilities—from academic foundations to distributed full-stack architectures.
          </p>
        </div>

        {/* Education Anchor Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-purple-700 dark:text-purple-400 uppercase tracking-wider block">
                Academic Foundation
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                BSc in Computer Science & Engineering
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Adama Science and Technology University (ASTU)
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 sm:text-right pl-14 sm:pl-0">
            <span>Rigorous Software Engineering Core</span>
          </div>
        </div>

        {/* Vertical Progression Ladder */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 ml-3 sm:ml-6">
          {JOURNEY_MILESTONES.map((milestone, idx) => (
            <div key={milestone.stage} className="relative group">
              
              {/* Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-purple-600 dark:border-purple-500 shadow-xs flex items-center justify-center group-hover:scale-125 transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-500"></span>
              </div>

              {/* Milestone Card */}
              <div className="p-5 rounded-xl bg-slate-50/70 dark:bg-[#0c121e] border border-slate-200/70 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800/80 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400">
                      Step {milestone.stage}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {milestone.focus}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {milestone.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                  {milestone.keySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {idx < JOURNEY_MILESTONES.length - 1 && (
                <div className="flex justify-center -mb-4 mt-2 text-slate-300 dark:text-slate-700">
                  <ArrowDown size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LearningJourney;
