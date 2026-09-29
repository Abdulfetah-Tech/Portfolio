import React from 'react';
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
  GitBranch 
} from 'lucide-react';

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
  return (
    <section id="about" className="py-20 bg-slate-50/50 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Engineering Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            "{PORTFOLIO_CONFIG.aboutText}"
          </p>
        </div>

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
