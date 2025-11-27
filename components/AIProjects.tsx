import React, { useState, useMemo } from 'react';
import { AI_PROJECTS } from '../constants';
import { Brain, BarChart3, Github, ExternalLink, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-4 rounded-xl shadow-2xl backdrop-blur-md z-50 animate-zoom-in">
        <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest">{label}</p>
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]" style={{ backgroundColor: payload[0].color }}></div>
            <span className="text-2xl font-bold text-white tracking-tight">{payload[0].value}</span>
            <span className="text-sm text-slate-500 font-medium self-end mb-1">% Score</span>
        </div>
      </div>
    );
  }
  return null;
};

const AIProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Extract unique tags and calculate counts
  const { allTags, tagCounts } = useMemo(() => {
    const counts: Record<string, number> = { 'All': AI_PROJECTS.length };
    const tags = new Set<string>();
    
    AI_PROJECTS.forEach(project => {
        project.tags.forEach(tag => {
            tags.add(tag);
            counts[tag] = (counts[tag] || 0) + 1;
        });
    });
    
    return {
        allTags: ['All', ...Array.from(tags).sort()],
        tagCounts: counts
    };
  }, []);

  // Filter projects based on selection
  const filteredProjects = activeFilter === 'All'
    ? AI_PROJECTS
    : AI_PROJECTS.filter(project => project.tags.includes(activeFilter));

  const chartColors = ['#a855f7', '#6b21a8', '#3b82f6', '#06b6d4']; // Secondary, Primary, Blue, Cyan

  return (
    <section id="ai-ml" className="py-24 bg-slate-900 text-white relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s'}}></div>
       </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-6 backdrop-blur-sm ring-1 ring-white/10 shadow-lg shadow-purple-900/50">
             <Brain className="text-purple-400 w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 mb-6">
            AI & Machine Learning
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Engineering intelligent systems that solve real-world problems through data-driven models and advanced analytics.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-slide-up delay-100">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                activeFilter === tag
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600'
              }`}
            >
              {tag}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] transition-colors ${
                  activeFilter === tag ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-white'
              }`}>
                  {tagCounts[tag]}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => {
            const isExpanded = !!expandedProjects[project.id];
            
            return (
              <div 
                key={project.id} 
                className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 md:p-8 hover:bg-slate-800/80 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-1 group animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Header: Title, Date & Links */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-purple-300/80 text-sm font-medium bg-purple-500/10 w-fit px-3 py-1 rounded-full border border-purple-500/20">
                      <Calendar size={14} className="mr-2" />
                      {project.date}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2.5 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-white hover:text-slate-900 transition-all hover:scale-110 shadow-lg"
                        title="View Code"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all hover:scale-110 shadow-lg shadow-purple-900/40"
                        title="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  
                  {/* Text Content */}
                  <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">The Problem</h4>
                      <p className="text-slate-300 leading-relaxed text-sm border-l-2 border-red-400/30 pl-3">
                        {project.problem}
                      </p>
                    </div>

                    {isExpanded && (
                      <>
                        <div className="space-y-2 animate-fade-in">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Our Approach</h4>
                          <p className="text-slate-300 leading-relaxed text-sm border-l-2 border-blue-400/30 pl-3">
                            {project.approach}
                          </p>
                        </div>
                        <div className="space-y-2 animate-fade-in">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">The Result</h4>
                          <p className="text-slate-300 leading-relaxed text-sm border-l-2 border-green-400/30 pl-3 bg-green-400/5 rounded-r-lg py-2">
                            {project.result}
                          </p>
                        </div>
                      </>
                    )}

                    <button 
                      onClick={() => toggleExpand(project.id)}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors w-fit focus:outline-none"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp size={16} /></>
                      ) : (
                        <>Read More <ChevronDown size={16} /></>
                      )}
                    </button>
                  </div>

                  {/* Chart & Stats */}
                  <div className="lg:col-span-2 flex flex-col h-full min-h-[250px] bg-slate-900/50 rounded-2xl border border-slate-700/50 p-4 relative overflow-hidden group/chart">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover/chart:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <BarChart3 size={14} /> PERFORMANCE
                      </span>
                    </div>

                    {project.metricsData ? (
                      <div className="flex-grow w-full h-full relative z-10">
                         <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={project.metricsData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis 
                              dataKey="name" 
                              type="category" 
                              width={80} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} 
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                            <Bar dataKey="value" barSize={12} radius={[0, 4, 4, 0]}>
                              {project.metricsData.map((entry, i) => (
                                <Cell key={`cell-${i}`} fill={chartColors[i % chartColors.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex-grow flex items-center justify-center text-slate-600 text-sm italic">
                        No metrics available
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Tags */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-white/5 text-slate-300 text-xs font-medium rounded-md border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300 transition-all cursor-default"
                    >
                      #{tag}
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

export default AIProjects;