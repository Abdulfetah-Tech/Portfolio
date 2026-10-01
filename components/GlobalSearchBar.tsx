import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  Code2, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Command, 
  Sparkles, 
  CornerDownLeft,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { 
  buildSearchIndex, 
  searchItems, 
  SearchItem, 
  SearchCategoryFilter 
} from '../services/searchIndexService';

interface GlobalSearchBarProps {
  compact?: boolean;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ compact = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<SearchCategoryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Build the in-memory search index once
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Filter items based on query and selected category tab
  const searchResults = useMemo(() => {
    return searchItems(searchIndex, query, selectedFilter);
  }, [searchIndex, query, selectedFilter]);

  // Counts for the category filter tabs
  const counts = useMemo(() => {
    return {
      all: searchItems(searchIndex, query, 'all').length,
      skills: searchItems(searchIndex, query, 'skills').length,
      projects: searchItems(searchIndex, query, 'projects').length,
      architecture: searchItems(searchIndex, query, 'architecture').length,
    };
  }, [searchIndex, query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedFilter]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K or / to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedFilter('all');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard navigation inside the modal
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, searchResults.length - 1)));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelectItem(searchResults[selectedIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!resultsContainerRef.current) return;
    const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Navigate to target section and dispatch interaction events
  const handleSelectItem = (item: SearchItem) => {
    setIsOpen(false);

    if (item.type === 'skill') {
      window.dispatchEvent(
        new CustomEvent('select-skill', {
          detail: {
            category: item.actionPayload.skillCategory,
            skill: item.actionPayload.skillName,
          },
        })
      );
    } else if (item.type === 'project') {
      window.dispatchEvent(
        new CustomEvent('select-project', {
          detail: {
            projectId: item.actionPayload.projectId,
            filter: item.actionPayload.projectFilter,
          },
        })
      );
    } else if (item.type === 'architecture') {
      window.dispatchEvent(
        new CustomEvent('select-architecture-flow', {
          detail: {
            flowId: item.actionPayload.flowId,
            nodeId: item.actionPayload.nodeId,
          },
        })
      );
    }

    // Smooth scroll to the target section or element
    setTimeout(() => {
      if (item.actionPayload.projectId) {
        const projEl = document.getElementById(`project-${item.actionPayload.projectId}`);
        if (projEl) {
          projEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          projEl.classList.add('ring-2', 'ring-purple-500', 'ring-offset-2');
          setTimeout(() => projEl.classList.remove('ring-2', 'ring-purple-500', 'ring-offset-2'), 2500);
          return;
        }
      }

      const sectionEl = document.querySelector(item.targetSection);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const getIconForType = (type: SearchItem['type'], title: string) => {
    if (type === 'skill') {
      if (title.toLowerCase().includes('flutter') || title.toLowerCase().includes('mobile')) {
        return <Smartphone size={16} className="text-cyan-500" />;
      }
      return <Code2 size={16} className="text-purple-500" />;
    }
    if (type === 'project') {
      if (title.toLowerCase().includes('flutter') || title.toLowerCase().includes('mobile')) {
        return <Smartphone size={16} className="text-cyan-500" />;
      }
      return <Layers size={16} className="text-blue-500" />;
    }
    return <Cpu size={16} className="text-amber-500" />;
  };

  const quickPicks = [
    'Flutter',
    '.NET 10',
    'Clean Architecture',
    'PostgreSQL',
    'JWT Authentication',
    'Angular Signals',
    'TMS API'
  ];

  return (
    <>
      {/* Header Trigger Input / Button */}
      {compact ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          aria-label="Search skills, projects, and architecture"
          title="Search (⌘K)"
        >
          <Search size={18} />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-between w-44 sm:w-56 md:w-64 lg:w-72 px-3 py-1.5 text-xs rounded-lg bg-slate-100/90 dark:bg-slate-900/90 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all shadow-2xs hover:border-purple-300 dark:hover:border-purple-800/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Search skills, projects, and architecture"
        >
          <span className="flex items-center gap-2 truncate">
            <Search size={14} className="text-purple-600 dark:text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">Search skills, projects, notes...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
            <span className="text-[9px]">⌘</span>K
          </kbd>
        </button>
      )}

      {/* Global Command Palette / Search Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[82vh] transition-all animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800">
              <Search size={18} className="text-purple-600 dark:text-purple-400 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search skills, projects, or architecture notes... (e.g. Flutter, .NET, CQRS)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                  title="Clear query"
                >
                  <X size={15} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                ESC
              </kbd>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/80 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  selectedFilter === 'all'
                    ? 'bg-purple-600 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Results</span>
                <span className="text-[10px] opacity-80">({counts.all})</span>
              </button>

              <button
                onClick={() => setSelectedFilter('skills')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  selectedFilter === 'skills'
                    ? 'bg-purple-600 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Code2 size={12} />
                <span>Skills</span>
                <span className="text-[10px] opacity-80">({counts.skills})</span>
              </button>

              <button
                onClick={() => setSelectedFilter('projects')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  selectedFilter === 'projects'
                    ? 'bg-purple-600 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Layers size={12} />
                <span>Projects</span>
                <span className="text-[10px] opacity-80">({counts.projects})</span>
              </button>

              <button
                onClick={() => setSelectedFilter('architecture')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  selectedFilter === 'architecture'
                    ? 'bg-purple-600 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Cpu size={12} />
                <span>Architecture</span>
                <span className="text-[10px] opacity-80">({counts.architecture})</span>
              </button>
            </div>

            {/* Quick Suggestion Chips (when query is empty) */}
            {!query && (
              <div className="px-4 py-2.5 bg-purple-50/40 dark:bg-purple-950/20 border-b border-purple-100/60 dark:border-purple-900/30 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
                <span className="text-purple-700 dark:text-purple-300 font-semibold shrink-0 flex items-center gap-1">
                  <Sparkles size={12} /> Quick picks:
                </span>
                <div className="flex items-center gap-1.5">
                  {quickPicks.map((pick) => (
                    <button
                      key={pick}
                      onClick={() => setQuery(pick)}
                      className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
                    >
                      {pick}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results List */}
            <div 
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin"
            >
              {searchResults.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <Search size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    No results found for "{query}"
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    Try searching for broader terms like "Flutter", "API", ".NET", "PostgreSQL", or "CQRS".
                  </p>
                </div>
              ) : (
                searchResults.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      data-index={idx}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 border ${
                        isSelected
                          ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 shadow-xs'
                          : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                          isSelected 
                            ? 'bg-purple-100 dark:bg-purple-900/80 text-purple-700 dark:text-purple-200' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {getIconForType(item.type, item.title)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                              {item.title}
                            </h4>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                              {item.type} • {item.category}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>

                          {item.tags.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                              {item.tags.slice(0, 4).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.2 rounded border border-purple-200/50 dark:border-purple-900/40"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1 text-slate-400 group-hover:text-purple-600 mt-2">
                        {isSelected && (
                          <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold mr-1">
                            Jump <CornerDownLeft size={10} />
                          </span>
                        )}
                        <ArrowRight size={14} className={isSelected ? 'text-purple-600 dark:text-purple-400 translate-x-0.5' : 'opacity-40'} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with keyboard shortcuts & result count */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">↑</kbd>
                  <kbd className="px-1 py-0.2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">↵</kbd>
                  <span>select</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">esc</kbd>
                  <span>close</span>
                </span>
              </div>

              <span>
                {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} found
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
