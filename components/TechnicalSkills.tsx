import React, { useState, useMemo } from 'react';
import { SKILL_CATEGORIES, SKILL_RADAR_DATA, SKILLS_SUMMARY } from '../config/portfolio';
import { 
  Terminal, 
  Search, 
  Cpu, 
  Globe, 
  Database, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2,
  Radar as RadarIcon,
  Sparkles,
  Layers,
  Smartphone,
  Check,
  Code2
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { FlutterSmartphoneVisual } from './FlutterSmartphoneVisual';
import { FlutterTechCard } from './FlutterTechCard';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Backend: Cpu,
  Frontend: Globe,
  'Mobile Development': Smartphone,
  Databases: Database,
  Security: ShieldCheck,
  'DevOps & Tools': Wrench,
  Testing: CheckCircle2
};

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white p-3 rounded-xl border border-purple-500/40 shadow-xl backdrop-blur-md text-xs z-50">
        <div className="flex items-center justify-between gap-3 mb-1">
          <span className="font-bold text-purple-300 text-sm">{data.subject}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-900/60 text-purple-200 border border-purple-700/50">
            {data.category}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-slate-400">Proficiency:</span>
          <span className="font-mono font-bold text-emerald-400">{data.score}%</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed max-w-[210px]">
          {data.details}
        </p>
      </div>
    );
  }
  return null;
};

const TechnicalSkills: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isDark = theme === 'dark';

  const categories = [
    'All', 
    'Backend', 
    'Frontend', 
    'Mobile Development', 
    'Databases', 
    'Security', 
    'DevOps & Tools', 
    'Testing'
  ];

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map(group => {
      const isCategoryMatch = selectedCategory === 'All' || group.category === selectedCategory;
      if (!isCategoryMatch) return null;

      const filteredSkills = searchQuery.trim() === ''
        ? group.skills
        : group.skills.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      if (filteredSkills.length === 0 && searchQuery.trim() !== '') return null;

      return {
        ...group,
        skills: filteredSkills
      };
    }).filter(Boolean) as typeof SKILL_CATEGORIES;
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Technical Proficiency
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Enterprise technologies across backend, frontend, mobile development, databases, security, DevOps, and testing.
          </p>
        </div>

        {/* 1. Recharts Radar Visualizer */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 mb-14 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Radar Left Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold">
                <RadarIcon size={14} /> Full-Stack &amp; Mobile Competency Matrix
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Architectural Proficiency Radar
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Balanced domain depth spanning .NET 10 backend APIs, modern Angular single page applications, cross-platform Flutter mobile clients, PostgreSQL relational stores, and zero-trust authentication policies.
              </p>

              <div className="pt-2 grid grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Backend</span>
                  <span className="font-bold text-slate-900 dark:text-white">C# · .NET 10</span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Web</span>
                  <span className="font-bold text-slate-900 dark:text-white">Angular</span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-cyan-800/40">
                  <span className="text-[10px] font-mono text-cyan-500 uppercase block mb-1">Mobile</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">Flutter</span>
                </div>
              </div>
            </div>

            {/* Radar Right Chart (7 cols) */}
            <div className="lg:col-span-7 h-[320px] sm:h-[360px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILL_RADAR_DATA}>
                  <PolarGrid stroke={isDark ? '#334155' : '#cbd5e1'} strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: isDark ? '#cbd5e1' : '#334155', fontSize: 11, fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 9 }}
                    stroke={isDark ? '#475569' : '#cbd5e1'}
                  />
                  <Tooltip content={<CustomRadarTooltip />} />
                  <Radar
                    name="Proficiency Level"
                    dataKey="score"
                    stroke="#7c3aed"
                    fill="#8b5cf6"
                    fillOpacity={isDark ? 0.45 : 0.3}
                    isAnimationActive={true}
                    animationDuration={500}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* 2. Skills Summary & Mobile Developer Visual Section (Requirements 6, 7 & 8) */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50/70 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column (7 cols): Skills Overview + Flutter Tech Card */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Skills Overview Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold mb-2">
                  <Code2 size={13} /> Disciplines &amp; Stack Overview
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Skills Summary
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Structured technical summary across core engineering competencies:
                </p>
              </div>

              {/* Requirement 7: Skills Summary Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {SKILLS_SUMMARY.map(item => (
                  <div 
                    key={item.category}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800 shadow-2xs hover:border-purple-300 dark:hover:border-purple-800/70 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {item.category}
                      </h4>
                    </div>
                    <p className="font-mono text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.skills}
                    </p>
                  </div>
                ))}
              </div>

              {/* Requirement 6: Mobile Technology Card */}
              <div className="pt-2">
                <FlutterTechCard />
              </div>

            </div>

            {/* Right Column (5 cols): Requirement 8 - Mobile Developer Visual (Smartphone) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block">
                  Mobile Development
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Flutter Application Interface
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Interactive smartphone demo running responsive Flutter screens
                </p>
              </div>

              <FlutterSmartphoneVisual />
            </div>

          </div>
        </div>

        {/* 3. Interactive Category Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto text-xs border border-slate-200/60 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  selectedCategory === cat
                    ? 'bg-purple-700 dark:bg-purple-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search specific skill or library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600"
            />
          </div>

        </div>

        {/* 4. Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group) => {
            const Icon = CATEGORY_ICONS[group.category] || Terminal;
            const isMobile = group.category === 'Mobile Development';

            return (
              <div
                key={group.category}
                className={`p-6 rounded-xl bg-white dark:bg-[#0c121e] border shadow-2xs transition-all flex flex-col justify-between ${
                  isMobile
                    ? 'border-cyan-300 dark:border-cyan-800/80 hover:border-cyan-500'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`p-2 rounded-lg border ${
                      isMobile
                        ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60'
                        : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800/40'
                    }`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {group.category}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs font-mono font-medium rounded border transition-colors ${
                        isMobile
                          ? 'bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-800 dark:text-cyan-200 border-cyan-200/70 dark:border-cyan-900/60 hover:border-cyan-400'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-700 dark:hover:text-purple-300'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechnicalSkills;
