import React, { useState } from 'react';
import { ENGINEERING_STEPS } from '../config/portfolio';
import { 
  Compass, 
  Layers, 
  Code2, 
  ShieldCheck, 
  CheckCircle, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const STEP_ICONS: Record<string, React.ElementType> = {
  Compass,
  Layers,
  Code2,
  ShieldCheck,
  CheckCircle,
  Rocket
};

const EngineeringApproach: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = ENGINEERING_STEPS[activeStepIndex];
  const ActiveIcon = STEP_ICONS[activeStep.iconName] || Code2;

  return (
    <section id="approach" className="py-20 bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How I Build Software
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A disciplined, production-grade engineering workflow from requirements definition to continuous cloud delivery.
          </p>
        </div>

        {/* 6-Step Visual Timeline Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {ENGINEERING_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[step.iconName] || Code2;
            const isSelected = activeStepIndex === idx;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  isSelected
                    ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-500/80 dark:border-purple-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-slate-400'}`}>
                    {step.number}
                  </span>
                  <Icon size={16} className={isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-slate-400'} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold leading-tight mb-1 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Stage description & deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-700 dark:bg-purple-600 text-white shadow-sm">
                  <ActiveIcon size={22} />
                </div>
                <div>
                  <span className="text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-widest block">
                    Phase {activeStep.number} of 06
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {activeStep.title} — {activeStep.subtitle}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] font-mono text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider block mb-1">
                  Tangible Deliverables:
                </span>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {activeStep.deliverables}
                </p>
              </div>
            </div>

            {/* Right Column: Engineering Practices Checklist (5 cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900/70 p-6 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles size={13} className="text-purple-600 dark:text-purple-400" />
                Engineering Best Practices
              </h4>
              <div className="space-y-3">
                {activeStep.practices.map((practice, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{practice}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default EngineeringApproach;
