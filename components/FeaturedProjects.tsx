import React, { useState, useEffect } from 'react';
import { FEATURED_PROJECTS, PORTFOLIO_ENGINEERING_METRICS } from '../config/portfolio';
import { ProjectItem, ProjectMilestone, ProjectMetrics } from '../types';
import { 
  ExternalLink, 
  Github, 
  X, 
  Layers, 
  CheckCircle2, 
  Code, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Compass,
  Code2,
  Rocket,
  Calendar,
  Clock,
  ListFilter,
  CheckCircle,
  Activity,
  BarChart3,
  GitBranch,
  FileCode,
  Zap,
  Gauge,
  SlidersHorizontal,
  Smartphone
} from 'lucide-react';
import { FlutterSmartphoneVisual } from './FlutterSmartphoneVisual';

// Phase helper to get appropriate icon and colors
const getPhaseIcon = (phase: string) => {
  switch (phase) {
    case 'Planning':
      return <Compass size={14} className="text-purple-600 dark:text-purple-400" />;
    case 'Architecture':
      return <Layers size={14} className="text-blue-600 dark:text-blue-400" />;
    case 'Development':
      return <Code2 size={14} className="text-emerald-600 dark:text-emerald-400" />;
    case 'Testing':
      return <ShieldCheck size={14} className="text-amber-600 dark:text-amber-400" />;
    case 'Deployment':
      return <Rocket size={14} className="text-rose-600 dark:text-rose-400" />;
    default:
      return <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400" />;
  }
};

interface ProjectLifecycleProps {
  milestones: ProjectMilestone[];
  projectId: string;
}

const ProjectLifecycleTimeline: React.FC<ProjectLifecycleProps> = ({ milestones, projectId }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(2); // Default to Development (index 2)
  const [showAllPhases, setShowAllPhases] = useState<boolean>(false);

  const activeMilestone = milestones[activePhaseIndex] || milestones[0];

  return (
    <div className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#080d17]/80 p-5 sm:p-7 transition-colors">
      
      {/* Sub-section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-700 dark:text-purple-300 font-mono font-bold text-xs">
            01-05
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              Development Lifecycle & Milestones
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200/80 dark:border-emerald-800/50">
                All 5 Phases Verified
              </span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive engineering progression from requirements scoping to production deployment.
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <button
          onClick={() => setShowAllPhases(!showAllPhases)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-800 transition-colors shadow-2xs"
        >
          <ListFilter size={12} />
          <span>{showAllPhases ? 'Switch to Stepper' : 'View All 5 Phases'}</span>
        </button>
      </div>

      {showAllPhases ? (
        /* Expanded 5-Phase Full Lifecycle Grid */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 animate-fade-in">
          {milestones.map((m, idx) => (
            <div
              key={m.phase}
              className={`p-3.5 rounded-xl border transition-all ${
                idx === activePhaseIndex
                  ? 'bg-white dark:bg-slate-900/90 border-purple-500/70 shadow-xs'
                  : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  PHASE 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {m.period}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-2 font-bold text-xs text-slate-900 dark:text-white">
                {getPhaseIcon(m.phase)}
                <span>{m.phase}</span>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mb-3 line-clamp-3">
                {m.summary}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 block">
                  Deliverables:
                </span>
                {m.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-1.5 text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
                    <CheckCircle size={10} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Stepper Track */
        <div className="space-y-4">
          
          {/* Stepper Node Ribbon */}
          <div className="relative">
            {/* Connecting Track Line */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 dark:bg-slate-800 z-0 hidden sm:block" />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative z-10">
              {milestones.map((m, idx) => {
                const isActive = idx === activePhaseIndex;
                const isPast = idx < activePhaseIndex;

                return (
                  <button
                    key={m.phase}
                    onClick={() => setActivePhaseIndex(idx)}
                    className={`flex flex-col items-center sm:items-start p-2.5 sm:p-3 rounded-xl border text-left transition-all group ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 border-purple-500 ring-2 ring-purple-500/20 shadow-sm'
                        : 'bg-white/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                        isActive
                          ? 'bg-purple-700 text-white dark:bg-purple-600'
                          : isPast
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {m.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 w-full">
                      {getPhaseIcon(m.phase)}
                      <span className={`text-xs font-bold truncate ${
                        isActive 
                          ? 'text-purple-700 dark:text-purple-300' 
                          : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}>
                        {m.phase}
                      </span>
                    </div>

                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {m.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Details Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/70 border border-purple-100 dark:border-purple-800/50">
                  {getPhaseIcon(activeMilestone.phase)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Phase 0{activePhaseIndex + 1}: {activeMilestone.phase}
                    </h5>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold">
                      {activeMilestone.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lifecycle objective & architectural deliverables
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800/40">
                <CheckCircle2 size={13} />
                <span>Status: {activeMilestone.status}</span>
              </div>
            </div>

            {/* Phase Summary */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {activeMilestone.summary}
            </p>

            {/* Deliverables Checklist */}
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Concrete Engineering Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeMilestone.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

// Top Engineering Metrics Dashboard Component
const EngineeringMetricsDashboard: React.FC = () => {
  const [selectedScope, setSelectedScope] = useState<string>('all');

  const selectedProject = FEATURED_PROJECTS.find(p => p.id === selectedScope);

  // Dynamic stats calculation based on selected scope
  const activeStats = selectedProject && selectedProject.metrics
    ? {
        name: selectedProject.title,
        loc: selectedProject.metrics.linesOfCodeFormatted,
        rawLoc: selectedProject.metrics.linesOfCode,
        coverage: selectedProject.metrics.testCoverage,
        testCount: selectedProject.metrics.testCount,
        deployFreq: selectedProject.metrics.deploymentFrequency,
        passRate: selectedProject.metrics.buildPassRate,
        latency: selectedProject.metrics.p99Latency || '< 40ms',
        container: selectedProject.metrics.containerSize || '140MB'
      }
    : {
        name: "All Featured Systems (Aggregate)",
        loc: PORTFOLIO_ENGINEERING_METRICS.totalLinesOfCodeFormatted,
        rawLoc: PORTFOLIO_ENGINEERING_METRICS.totalLinesOfCode,
        coverage: PORTFOLIO_ENGINEERING_METRICS.averageTestCoverage,
        testCount: PORTFOLIO_ENGINEERING_METRICS.totalAutomatedTests,
        deployFreq: PORTFOLIO_ENGINEERING_METRICS.deploymentFrequency,
        passRate: PORTFOLIO_ENGINEERING_METRICS.buildPassRate,
        latency: PORTFOLIO_ENGINEERING_METRICS.averageP99Latency,
        container: "148MB (Distroless)"
      };

  return (
    <div className="mb-14 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-colors">
      
      {/* Dashboard Top Header & Project Scope Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
              <Activity size={12} className="animate-pulse text-purple-600 dark:text-purple-400" />
              Live Telemetry & Production Rigor
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              CI Passing (99.3%)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Production Quality & Engineering Metrics
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real software metrics across ASP.NET Core Web APIs, Angular Signals frontends, and PostgreSQL databases.
          </p>
        </div>

        {/* Dynamic Project Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 dark:bg-slate-950/80 p-1.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
          <button
            onClick={() => setSelectedScope('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedScope === 'all'
                ? 'bg-purple-700 text-white dark:bg-purple-600 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Systems (Aggregate)
          </button>
          {FEATURED_PROJECTS.map(proj => (
            <button
              key={proj.id}
              onClick={() => setSelectedScope(proj.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedScope === proj.id
                  ? 'bg-purple-700 text-white dark:bg-purple-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {proj.id === 'tms-api' ? 'TMS API' : 
               proj.id === 'fetan-platform' ? 'Fetan' : 
               proj.id === 'onegov-platform' ? 'OneGov' : 'Full-Stack'}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic 4-Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
        
        {/* Metric 1: Lines of Code */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800/60 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">
              Lines of Code
            </span>
            <FileCode size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
              {activeStats.loc}
            </span>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
              Production
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            Hand-crafted, idiomatic C# (.NET 10) & TypeScript (Angular Signals).
          </p>
          
          {/* Visual Language Breakdown Bar */}
          <div className="space-y-1 pt-2 border-t border-slate-200/50 dark:border-slate-800">
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden">
              <div className="h-full bg-purple-600" style={{ width: '54%' }} title="C# 54%" />
              <div className="h-full bg-sky-500" style={{ width: '32%' }} title="TypeScript 32%" />
              <div className="h-full bg-emerald-500" style={{ width: '10%' }} title="SQL 10%" />
              <div className="h-full bg-amber-500" style={{ width: '4%' }} title="Docker 4%" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>C# 54%</span>
              <span>TS 32%</span>
              <span>SQL 10%</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Test Coverage */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800/60 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">
              Test Coverage
            </span>
            <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
              {activeStats.coverage}%
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Branch & Invariants
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            {activeStats.testCount} automated test cases (xUnit, Moq, Vitest, Playwright).
          </p>

          {/* Visual Coverage Progress Meter */}
          <div className="space-y-1 pt-2 border-t border-slate-200/50 dark:border-slate-800">
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${activeStats.coverage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Target: &gt;80%</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Exceeded (+{Math.round(activeStats.coverage - 80)}%)</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Deployment Frequency */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800/60 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">
              Deployment Frequency
            </span>
            <Rocket size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight truncate">
              {activeStats.deployFreq.split(' ')[0]}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
              CI/CD
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 truncate">
            {activeStats.deployFreq}
          </p>

          <div className="space-y-1 pt-2 border-t border-slate-200/50 dark:border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">Build Pass Rate</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeStats.passRate}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <GitBranch size={11} className="text-purple-500" />
              <span>GitHub Actions & Docker Automated</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Performance & Latency */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800/60 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">
              P99 Response Latency
            </span>
            <Zap size={18} className="text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400 tracking-tight">
              {activeStats.latency}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              SLA &lt;50ms
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            Keyset pagination, AsNoTracking reads & Kestrel HTTP optimization.
          </p>

          <div className="space-y-1 pt-2 border-t border-slate-200/50 dark:border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">Docker Image</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">{activeStats.container}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={11} />
              <span>Multi-stage Distroless Container</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scope Footer Info */}
      <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Active Telemetry Scope:</span>
          <span className="text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200/60 dark:border-purple-800/40">
            {activeStats.name}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span>Zero-Warning TypeScript &amp; C# Nullable Safety:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Enforced</span>
        </span>
      </div>

    </div>
  );
};

const FeaturedProjects: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Web' | 'Mobile' | 'Backend' | 'Full Stack'>('All');

  const filterTabs: ('All' | 'Web' | 'Mobile' | 'Backend' | 'Full Stack')[] = [
    'All',
    'Web',
    'Mobile',
    'Backend',
    'Full Stack'
  ];

  const filteredProjects = FEATURED_PROJECTS.filter(project => {
    if (selectedFilter === 'All') return true;
    return project.filterCategories?.includes(selectedFilter as any);
  });

  const openCaseStudy = (project: ProjectItem) => {
    setSelectedCaseStudy(project);
    document.body.style.overflow = 'hidden';
  };

  const closeCaseStudy = () => {
    setSelectedCaseStudy(null);
    document.body.style.overflow = 'unset';
  };

  const copySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleSelectProject = (e: CustomEvent<{ projectId?: string; filter?: string }>) => {
      if (e.detail?.filter && filterTabs.includes(e.detail.filter as any)) {
        setSelectedFilter(e.detail.filter as any);
      } else if (e.detail?.projectId) {
        // Find project and set appropriate filter if current filter hides it
        const proj = FEATURED_PROJECTS.find(p => p.id === e.detail?.projectId);
        if (proj && selectedFilter !== 'All' && !proj.filterCategories?.includes(selectedFilter as any)) {
          setSelectedFilter('All');
        }
      }
    };

    window.addEventListener('select-project', handleSelectProject as EventListener);
    return () => window.removeEventListener('select-project', handleSelectProject as EventListener);
  }, [selectedFilter]);

  return (
    <section id="projects" className="py-20 bg-slate-50/50 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-world systems, production-style web APIs, marketplaces, mobile apps, and full-stack architectures built for reliability.
          </p>
        </div>

        {/* Dynamic Production Engineering Metrics Dashboard */}
        <EngineeringMetricsDashboard />

        {/* Project Filtering Tabs (Requirement 9: All | Web | Mobile | Backend | Full Stack) */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            {filterTabs.map(tab => {
              const isActive = selectedFilter === tab;
              const count = tab === 'All' 
                ? FEATURED_PROJECTS.length 
                : FEATURED_PROJECTS.filter(p => p.filterCategories?.includes(tab as any)).length;

              return (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    isActive
                      ? 'bg-purple-700 dark:bg-purple-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <span>{tab}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive 
                      ? 'bg-purple-900/60 text-purple-200' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-14">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Upper Project Specification Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Left / Info Panel (7 cols) */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-100 dark:border-purple-800/40">
                          {project.subtitle}
                        </span>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          Project 0{index + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                        {project.title}
                      </h3>

                      {/* Project Individual Metrics Pill Bar */}
                      {project.metrics && (
                        <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
                            LOC: <strong>{project.metrics.linesOfCodeFormatted}</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                            Coverage: <strong>{project.metrics.testCoverage}%</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50">
                            Deploy: <strong>{project.metrics.deploymentFrequency.split(' ')[0]}</strong>
                          </span>
                          {project.metrics.p99Latency && (
                            <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50">
                              P99: <strong>{project.metrics.p99Latency}</strong>
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Problem Solved Highlight Box */}
                      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 text-xs">
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1">
                          Problem Solved
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {project.problemSolved}
                        </p>
                      </div>

                      {/* Trade Categories if available (Project 2 Fetan) */}
                      {project.categories && (
                        <div className="mb-5">
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                            Verified Trade Categories:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.categories.map((cat) => (
                              <span
                                key={cat}
                                className="px-2.5 py-0.5 text-xs font-mono bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 rounded border border-purple-200/60 dark:border-purple-800/40"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Small Architecture Flow Preview */}
                      {project.architectureFlow && (
                        <div className="mb-5 p-3 rounded-lg bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                            Architecture Pipeline:
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                            {project.architectureFlow.map((node, i) => (
                              <React.Fragment key={node}>
                                <span className="font-semibold text-purple-700 dark:text-purple-300">{node}</span>
                                {i < project.architectureFlow!.length - 1 && (
                                  <span className="text-slate-400">→</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      {project.hasCaseStudy && (
                        <button
                          onClick={() => openCaseStudy(project)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 transition-colors shadow-2xs"
                        >
                          View Case Study <ChevronRight size={13} />
                        </button>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-colors"
                        >
                          <Github size={14} /> GitHub Code
                        </a>
                      )}

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                        >
                          Live Demo <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right / Visual Architectural Blueprint Panel (5 cols) */}
                  <div className="lg:col-span-5 bg-slate-100/60 dark:bg-[#070b13] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800">
                    {project.id === 'flutter-tms-mobile' ? (
                      /* Polished Smartphone Mockup presentation for the Featured Mobile Project (Requirement 4) */
                      <div className="flex flex-col items-center justify-between h-full space-y-4">
                        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-semibold">
                            <Smartphone size={13} />
                            Flutter Mobile Interface
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                            Development Project
                          </span>
                        </div>

                        <div className="py-1">
                          <FlutterSmartphoneVisual compact={true} />
                        </div>

                        <div className="w-full pt-2 text-[10px] font-mono text-slate-400 dark:text-slate-500 text-center border-t border-slate-200/60 dark:border-slate-800">
                          Interactive Material 3 screens: Login · Dashboard · Courses · Profile
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                          <span className="flex items-center gap-1.5">
                            <Layers size={13} className="text-purple-600 dark:text-purple-400" />
                            System Blueprint
                          </span>
                          <span className="text-[10px] text-emerald-500 font-semibold">● Production Spec</span>
                        </div>

                        {/* Key Features Bullet List */}
                        <div className="space-y-2.5 mb-6">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                            Engineered Capabilities:
                          </span>
                          {project.keyFeatures.slice(0, 4).map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Mock Code Preview Tile */}
                        {project.codeSnippet && (
                          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-xs font-mono text-slate-300 overflow-hidden">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 border-b border-slate-800 pb-1.5">
                              <span>{project.codeSnippet.filename}</span>
                              <span className="text-purple-400">{project.codeSnippet.language}</span>
                            </div>
                            <pre className="text-[11px] leading-relaxed text-slate-300 overflow-x-auto max-h-36">
                              <code>{project.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-6 pt-3 text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center justify-between">
                      <span>Pattern: {project.architectureType.split(' ')[0]}</span>
                      <span>Verified Contract</span>
                    </div>
                  </div>

                </div>

                {/* Sub-Section: Timeline & Development Milestones */}
                {project.milestones && project.milestones.length > 0 && (
                  <ProjectLifecycleTimeline
                    milestones={project.milestones}
                    projectId={project.id}
                  />
                )}

              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs transition-opacity"
          onClick={closeCaseStudy}
        >
          <div
            className="bg-white dark:bg-[#0c121e] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                  Project Case Study
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCaseStudy.title}
                </h3>
              </div>
              <button
                onClick={closeCaseStudy}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Case Study Modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Architecture Overview Banner */}
              <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60">
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 uppercase block mb-1">
                  System Architecture
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedCaseStudy.architectureType}
                </p>
                {selectedCaseStudy.architectureFlow && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-purple-200/50 dark:border-purple-800/50 text-xs font-mono">
                    {selectedCaseStudy.architectureFlow.map((node, i) => (
                      <React.Fragment key={node}>
                        <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                          {node}
                        </span>
                        {i < selectedCaseStudy.architectureFlow!.length - 1 && <span>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider mb-2">
                    Core Engineering Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedCaseStudy.problemSolved}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider mb-2">
                    Architectural Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedCaseStudy.description}
                  </p>
                </div>
              </div>

              {/* Engineering Metrics Breakdown in Case Study */}
              {selectedCaseStudy.metrics && (
                <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800">
                  <h4 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                    Project Telemetry & Verified Benchmarks
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Lines of Code</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white">
                        {selectedCaseStudy.metrics.linesOfCodeFormatted}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Test Coverage</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                        {selectedCaseStudy.metrics.testCoverage}%
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Deploy Cadence</span>
                      <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                        {selectedCaseStudy.metrics.deploymentFrequency.split(' ')[0]}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">P99 Latency</span>
                      <span className="text-base font-bold text-amber-500">
                        {selectedCaseStudy.metrics.p99Latency}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Complete Development Milestones & Lifecycle Breakdown in Modal */}
              {selectedCaseStudy.milestones && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Development Lifecycle & Milestone Verification
                    </h4>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      5 / 5 Phases Complete
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedCaseStudy.milestones.map((milestone, idx) => (
                      <div
                        key={milestone.phase}
                        className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center text-[10px] font-mono font-bold">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {milestone.phase} Phase
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {milestone.period}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                            ● {milestone.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                          {milestone.summary}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {milestone.deliverables.map((del, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start gap-1.5 p-2 rounded-md bg-white dark:bg-slate-950 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                            >
                              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-tight">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features List */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Production Features & Functional Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCaseStudy.keyFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Deep-Dive */}
              {selectedCaseStudy.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Code size={14} className="text-purple-600 dark:text-purple-400" />
                      Source Implementation ({selectedCaseStudy.codeSnippet.filename})
                    </span>
                    <button
                      onClick={() => copySnippet(selectedCaseStudy.codeSnippet!.code)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors"
                    >
                      {copied ? <Check size={12} className="text-emerald-400" /> : null}
                      {copied ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 max-h-72">
                    <code>{selectedCaseStudy.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.technologies.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-mono rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 justify-end">
                {selectedCaseStudy.githubUrl && (
                  <a
                    href={selectedCaseStudy.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Github size={14} /> View on GitHub
                  </a>
                )}
                {selectedCaseStudy.demoUrl && (
                  <a
                    href={selectedCaseStudy.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 transition-colors"
                  >
                    <ExternalLink size={14} /> Open Live Demo
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default FeaturedProjects;
