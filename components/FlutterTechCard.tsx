import React, { useState } from 'react';
import { 
  Smartphone, 
  Layers, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';

interface FlutterTechItem {
  name: string;
  category: string;
  summary: string;
  snippet?: string;
}

const FLUTTER_TECH_ITEMS: FlutterTechItem[] = [
  {
    name: "Flutter",
    category: "SDK & Engine",
    summary: "Cross-platform mobile UI framework compiling to native ARM and x86 machine code.",
    snippet: "runApp(const TrainingManagementApp());"
  },
  {
    name: "Dart",
    category: "Language",
    summary: "Object-oriented, strongly typed client-optimized language with sound null safety and async/await.",
    snippet: "Future<List<CourseDto>> fetchCourses() async { ... }"
  },
  {
    name: "Widgets",
    category: "UI Composition",
    summary: "Declarative widget trees with immutable Stateless and stateful component architectures.",
    snippet: "Widget build(BuildContext context) => Scaffold(...);"
  },
  {
    name: "Material Design",
    category: "Design System",
    summary: "Material 3 mobile guidelines, dynamic elevation, responsive layouts, and typography.",
    snippet: "theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.cyan)"
  },
  {
    name: "REST APIs",
    category: "Networking",
    summary: "HTTP client integration, JSON decoding, status code interceptors, and DTO contracts.",
    snippet: "final res = await http.get(Uri.parse('$apiUrl/courses'));"
  },
  {
    name: "State Management",
    category: "Reactivity",
    summary: "Predictable state progression, separation of concerns, and reactive event listeners.",
    snippet: "context.read<CourseBloc>().add(LoadCoursesEvent());"
  },
  {
    name: "Authentication",
    category: "Security Tier",
    summary: "JWT bearer token authorization, transparent refresh cycles, and session expiration handling.",
    snippet: "headers['Authorization'] = 'Bearer $accessToken';"
  },
  {
    name: "Local Storage",
    category: "Persistence",
    summary: "Encrypted device key-value storage preserving offline access and cached preferences.",
    snippet: "await secureStorage.write(key: 'jwt', value: token);"
  }
];

export const FlutterTechCard: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<FlutterTechItem>(FLUTTER_TECH_ITEMS[0]);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1224] to-slate-900 text-white border border-cyan-800/50 shadow-xl relative overflow-hidden">
      
      {/* Subtle Flutter-inspired background geometry accent */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Flutter badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-700/60 shadow-inner">
            <Smartphone size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Flutter Development
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-900/60 text-cyan-200 border border-cyan-700/40">
                Cross-Platform
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-cyan-300/90 font-mono mt-0.5">
              Build once, deliver across platforms.
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-cyan-400/80 flex items-center gap-1.5">
          <Sparkles size={12} /> Interactive Capability Card
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 relative z-10">
        Engineered cross-platform mobile development using Flutter and Dart, connecting responsive Material Design widget trees directly to backend ASP.NET Core REST APIs with JWT security.
      </p>

      {/* Interactive Technology Chips Grid */}
      <div className="mb-6 relative z-10">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
          Core Technologies &amp; Patterns (Click to Inspect)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FLUTTER_TECH_ITEMS.map((item) => {
            const isSelected = selectedTech.name === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setSelectedTech(item)}
                className={`px-3 py-2 rounded-xl text-left border transition-all text-xs font-mono flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-xs scale-102 font-bold'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-800/80 hover:text-white'
                }`}
              >
                <span>{item.name}</span>
                {isSelected ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                ) : (
                  <span className="text-[10px] text-slate-500">{item.category.split(' ')[0]}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tech Item Detail Tile */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-cyan-900/60 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400">
              {selectedTech.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {selectedTech.category}
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={12} /> Production Integration Pattern
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {selectedTech.summary}
        </p>

        {selectedTech.snippet && (
          <div className="p-2.5 rounded-lg bg-black/80 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
            <code>{selectedTech.snippet}</code>
          </div>
        )}
      </div>

    </div>
  );
};
