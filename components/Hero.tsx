import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import { 
  ArrowDown, 
  ArrowRight, 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  Check, 
  Copy,
  Cpu,
  Layers,
  Database,
  Smartphone
} from 'lucide-react';

interface HeroProps {
  onOpenCvModal: () => void;
}

const TERMINAL_SNIPPETS = [
  {
    id: 'api',
    tab: 'CoursesEndpoints.cs',
    lang: 'csharp',
    badge: '.NET 10 Web API',
    code: `// ASP.NET Core Minimal API with Typed Results & FluentValidation
app.MapPost("/api/v1/courses", async (
    [FromBody] CreateCourseReq req,
    IValidator<CreateCourseReq> validator,
    ICourseService service,
    CancellationToken ct) =>
{
    var val = await validator.ValidateAsync(req, ct);
    if (!val.IsValid) 
        return Results.ValidationProblem(val.ToDictionary());

    var result = await service.CreateAsync(req.ToDto(), ct);
    return Results.Created($"/api/v1/courses/{result.Id}", result);
})
.WithName("CreateCourse")
.Produces<CourseDto>(StatusCodes.Status201Created)
.ProducesProblem(StatusCodes.Status400BadRequest);`
  },
  {
    id: 'mobile',
    tab: 'course_api_service.dart',
    lang: 'dart',
    badge: 'Flutter & Dart Mobile',
    code: `// Cross-platform Flutter API client with secure JWT injection
class CourseApiService {
  final http.Client _client = http.Client();
  final _storage = const FlutterSecureStorage();
  final String _baseUrl = 'https://api.training.local/api/v1';

  Future<List<CourseDto>> getCourses() async {
    final token = await _storage.read(key: 'jwt_token');
    final res = await _client.get(
      Uri.parse('\$_baseUrl/courses'),
      headers: {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer \$token',
      },
    );
    if (res.statusCode == 200) {
      final List list = jsonDecode(res.body);
      return list.map((e) => CourseDto.fromJson(e)).toList();
    }
    throw ApiException('Failed: \${res.statusCode}');
  }
}`
  },
  {
    id: 'frontend',
    tab: 'course-store.ts',
    lang: 'typescript',
    badge: 'Angular Signals',
    code: `// Enterprise State with NgRx SignalStore & Signals
export const CourseStore = signalStore(
  { providedIn: 'root' },
  withState({ courses: [] as CourseDto[], isLoading: false }),
  withComputed(({ courses }) => ({
    activeCount: computed(() => courses().filter(c => c.isActive).length),
    totalCredits: computed(() => courses().reduce((acc, c) => acc + c.credits, 0))
  })),
  withMethods((store, api = inject(CourseService)) => ({
    loadAll: rxMethod<void>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(() => api.getAll().pipe(
        tapResponse({
          next: (courses) => patchState(store, { courses, isLoading: false }),
          error: () => patchState(store, { isLoading: false })
        })
      ))
    ))
  }))
);`
  },
  {
    id: 'db',
    tab: 'schema.sql',
    lang: 'sql',
    badge: 'PostgreSQL Relational',
    code: `// PostgreSQL Relational Persistence & Index Strategy
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    code VARCHAR(30) UNIQUE NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX idx_courses_active_created 
ON courses (is_active, created_at DESC);`
  }
];

const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSnippet = TERMINAL_SNIPPETS[activeSnippetIndex];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-grid-pattern transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top engineering badge */}
        <div className="flex justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available for Full-Stack & Backend Engineering Roles</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Introduction (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono text-purple-600 dark:text-purple-400 font-semibold block">
                Software Engineer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                {PORTFOLIO_CONFIG.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                  {PORTFOLIO_CONFIG.role}
                </p>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                <span className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-400 font-mono">
                  {PORTFOLIO_CONFIG.secondaryCapability}
                </span>
              </div>
            </div>

            {/* Supporting Description with Full Stack & Mobile Scope */}
            <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-snug">
              {PORTFOLIO_CONFIG.supportingHeadline}
            </p>

            {/* Core Capability Spectrum */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/70 dark:border-purple-800/40 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold block mb-1">
                Engineering Spectrum
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
                Web applications • REST APIs • Mobile applications • Databases • Authentication • Testing
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {PORTFOLIO_CONFIG.shortIntro}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { name: ".NET 10 / ASP.NET Core", icon: Cpu },
                { name: "Angular & Signals", icon: Layers },
                { name: "Flutter & Dart", icon: Smartphone },
                { name: "PostgreSQL & EF Core", icon: Database },
                { name: "RESTful APIs", icon: Terminal }
              ].map(tech => {
                const Icon = tech.icon;
                return (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs"
                  >
                    <Icon size={12} className="text-purple-600 dark:text-purple-400" />
                    {tech.name}
                  </span>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                View My Projects
                <ArrowRight size={14} />
              </a>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <Download size={14} className="text-purple-600 dark:text-purple-400" />
                Download CV
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <Mail size={14} />
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Connect:</span>
              <a 
                href={PORTFOLIO_CONFIG.github} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github size={14} /> github/{PORTFOLIO_CONFIG.githubUsername}
              </a>
              <span>·</span>
              <a 
                href={PORTFOLIO_CONFIG.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin size={14} /> linkedin
              </a>
              <span>·</span>
              <a 
                href={`mailto:${PORTFOLIO_CONFIG.email}`} 
                className="inline-flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Mail size={14} /> email
              </a>
            </div>

          </div>

          {/* Right Column: Code & Architecture Terminal Element (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e] shadow-xl overflow-hidden transition-all">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2 font-mono text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Terminal size={12} className="text-purple-600 dark:text-purple-400" />
                    architecture.snippet
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {activeSnippet.badge}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                    title="Copy code"
                    aria-label="Copy snippet code"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Code Snippet Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2 overflow-x-auto text-xs font-mono">
                {TERMINAL_SNIPPETS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSnippetIndex(idx)}
                    className={`px-3 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                      activeSnippetIndex === idx
                        ? 'border-purple-600 text-purple-700 dark:text-purple-300 bg-white dark:bg-[#0c121e]'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {item.tab}
                  </button>
                ))}
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto max-h-[340px]">
                <pre>
                  <code>{activeSnippet.code}</code>
                </pre>
              </div>

              {/* Terminal Footer Status */}
              <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Production-tested syntax</span>
                <span className="text-emerald-400 font-medium">✓ Clean & Strongly Typed</span>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 pt-4 flex justify-center">
          <a
            href="#about"
            className="group inline-flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            aria-label="Scroll to About section"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
