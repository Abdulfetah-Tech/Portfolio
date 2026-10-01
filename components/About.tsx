import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import { 
  Server, 
  Globe, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Code2, 
  GitBranch,
  FileText,
  ExternalLink,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Github
} from 'lucide-react';
import { fetchPortfolioReadme, GitHubReadmeData } from '../services/githubReadmeService';

const ENGINEERING_PILLARS = [
  {
    title: "Software Engineering",
    icon: Code2,
    desc: "Rigorous adherence to SOLID principles, clean code patterns, and maintainable modular designs.",
    highlight: "Maintainability & Clean Design"
  },
  {
    title: "Backend Engineering",
    icon: Server,
    desc: "High-throughput services with C# 13 and .NET 10, minimal APIs, Kestrel server, and dependency injection.",
    highlight: "C# 13 · .NET 10 · Kestrel"
  },
  {
    title: "API Development",
    icon: Cpu,
    desc: "RESTful architecture, strongly typed DTOs, FluentValidation, OpenAPI/Scalar, and RFC 9457 ProblemDetails.",
    highlight: "REST APIs · OpenAPI · DTOs"
  },
  {
    title: "Database Engineering",
    icon: Database,
    desc: "Relational modeling in PostgreSQL, EF Core 10 Code-First migrations, indexing, and query optimization.",
    highlight: "PostgreSQL · EF Core 10 · Indexing"
  },
  {
    title: "Angular Frontend",
    icon: Globe,
    desc: "Modern reactive frontends with standalone components, Angular Signals, NgRx SignalStore, and RxJS.",
    highlight: "Signals · Standalone · NgRx"
  },
  {
    title: "Security & Identity",
    icon: ShieldCheck,
    desc: "Defense-in-depth with OAuth 2.0, OpenID Connect, JWT refresh rotation, and policy-based authorization.",
    highlight: "OAuth 2.0 · JWT · RBAC"
  },
  {
    title: "Testing & Quality",
    icon: CheckCircle2,
    desc: "Automated test pyramid with xUnit, Moq, WebApplicationFactory, Vitest, and Playwright E2E.",
    highlight: "xUnit · WebAppFactory · Playwright"
  },
  {
    title: "Modern Architecture",
    icon: Layers,
    desc: "Clean Architecture, CQRS with MediatR, SignalR real-time hubs, and cloud-ready containerized microservices.",
    highlight: "Clean Arch · CQRS · SignalR"
  }
];

const SKILL_PROGRESSION = [
  { level: "System Architecture", desc: "Clean Architecture, CQRS, SignalR real-time hubs, and domain decomposition" },
  { level: "Backend & APIs", desc: ".NET 10, ASP.NET Core, Minimal APIs, Dependency Injection, and DTO contracts" },
  { level: "Database Persistence", desc: "PostgreSQL, EF Core 10, relational constraints, indexing, and migration pipelines" },
  { level: "Modern Frontend", desc: "Angular standalone components, Signals, NgRx SignalStore, and responsive UX" },
  { level: "Verification & Security", desc: "xUnit, WebApplicationFactory, Playwright, OAuth 2.0, and JWT authentication" }
];

const About: React.FC = () => {
  const [readmeData, setReadmeData] = useState<GitHubReadmeData | null>(null);
  const [showReadmeOverview, setShowReadmeOverview] = useState<boolean>(false);
  const [loadingReadme, setLoadingReadme] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    fetchPortfolioReadme()
      .then((data) => {
        if (mounted) {
          setReadmeData(data);
          setLoadingReadme(false);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch portfolio README in About section:', err);
        if (mounted) setLoadingReadme(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const openReadmeInGitHubSection = () => {
    window.dispatchEvent(new CustomEvent('open-github-readme'));
    const el = document.getElementById('github');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-slate-50/50 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                Engineering Profile
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Synced with GitHub README</span>
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              About Me
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              "{PORTFOLIO_CONFIG.aboutText}"
            </p>
          </div>

          {/* Quick README Integration Card */}
          <div className="lg:w-80 shrink-0 p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                <Github size={13} className="text-purple-600 dark:text-purple-400" />
                <span>Repository README</span>
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                {readmeData?.isLive ? 'Live Sync' : 'Active'}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-3 leading-relaxed">
              {readmeData?.overviewText || "This portfolio is designed to present Abdulfetah Bedru as a full-stack software engineer with a strong focus on modern web application development, scalable systems, and high-quality product engineering."}
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowReadmeOverview(!showReadmeOverview)}
                className="w-full text-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {showReadmeOverview ? "Hide Dynamic Notes" : "View Dynamic Spec Notes"}
              </button>
              <button
                onClick={openReadmeInGitHubSection}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                <FileText size={13} />
                <span>Read Full Rendered README</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic README Expanded Notes Drawer */}
        {showReadmeOverview && readmeData && (
          <div className="mb-12 p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60 shadow-inner transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-purple-200/60 dark:border-purple-800/60">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono">
                  Dynamic Portfolio Specification ({readmeData.repoName}/README.md)
                </h3>
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Fetched from main branch • {readmeData.fetchedAt}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {readmeData.overviewText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-purple-200/60 dark:border-purple-900/40">
                <div className="font-bold text-purple-700 dark:text-purple-300 mb-1.5">Site Architecture Modules</div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                  {readmeData.highlights.slice(0, 5).map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-purple-500"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-purple-200/60 dark:border-purple-900/40">
                <div className="font-bold text-purple-700 dark:text-purple-300 mb-1.5">Verified Tech Stack</div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                  {readmeData.techStack.map((tech, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-purple-200/60 dark:border-purple-900/40 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">Source Repository</div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2">
                    Managed publicly on GitHub with continuous integration and verification.
                  </p>
                </div>
                <a
                  href={`https://github.com/${PORTFOLIO_CONFIG.githubUsername}/Portfolio`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                >
                  <span>github.com/{PORTFOLIO_CONFIG.githubUsername}/Portfolio</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Visual Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {ENGINEERING_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800/60 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800/40">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-semibold px-2 py-0.5 rounded bg-purple-50/80 dark:bg-purple-950/40">
                      {pillar.highlight}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Skill Progression Ladder */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch size={18} className="text-purple-600 dark:text-purple-400" />
                Engineering Competency Spectrum
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                From low-level data persistence up to high-level reactive presentation and distributed architectures
              </p>
            </div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
              Full-Stack Scope
            </span>
          </div>

          <div className="space-y-3">
            {SKILL_PROGRESSION.map((step, idx) => (
              <div
                key={step.level}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 gap-2 hover:border-purple-200 dark:hover:border-purple-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md font-mono text-xs font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center flex-shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {step.level}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-right pl-9 sm:pl-0 font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
