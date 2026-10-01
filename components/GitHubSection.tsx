import React, { useState, useEffect, useMemo } from 'react';
import { PORTFOLIO_CONFIG, FEATURED_REPOSITORIES } from '../config/portfolio';
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Code2, 
  GitCommit, 
  Sparkles, 
  RefreshCw, 
  Flame, 
  Calendar, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Activity, 
  BarChart3, 
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Check,
  FileText,
  BookOpen,
  Copy,
  Terminal,
  ArrowRight,
  Hash
} from 'lucide-react';
import { 
  fetchGitHubActivity, 
  GitHubActivityData, 
  ContributionDay, 
  MonthlyTrend,
  LanguageStat,
  GitHubCommitEvent
} from '../services/githubService';
import { 
  fetchPortfolioReadme, 
  GitHubReadmeData 
} from '../services/githubReadmeService';
import { MarkdownViewer } from './MarkdownViewer';

const LEVEL_COLORS_DARK = [
  'bg-slate-800/60 border-slate-800',
  'bg-purple-950/90 border-purple-900/60',
  'bg-purple-800/90 border-purple-700/80',
  'bg-purple-600 border-purple-500',
  'bg-purple-400 border-purple-300'
];

const LEVEL_COLORS_LIGHT = [
  'bg-slate-100 border-slate-200/80',
  'bg-purple-200 border-purple-300',
  'bg-purple-400 border-purple-500',
  'bg-purple-600 border-purple-700',
  'bg-purple-800 border-purple-900'
];

export const GitHubSection: React.FC = () => {
  const [activityData, setActivityData] = useState<GitHubActivityData | null>(null);
  const [readmeData, setReadmeData] = useState<GitHubReadmeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refreshingReadme, setRefreshingReadme] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'trends' | 'languages' | 'recent' | 'readme'>('calendar');
  const [calendarViewSpan, setCalendarViewSpan] = useState<'full' | 'half'>('full'); // 52 weeks or 26 weeks
  const [readmeViewMode, setReadmeViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copiedReadme, setCopiedReadme] = useState<boolean>(false);

  // Fetch GitHub activity data and README on mount
  const loadData = async (force: boolean = false) => {
    if (force) {
      setRefreshing(true);
      try {
        localStorage.removeItem('abdulfetah_github_activity_v1');
      } catch (e) {
        // ignore
      }
    } else {
      setLoading(true);
    }

    try {
      const [activity, readme] = await Promise.all([
        fetchGitHubActivity(PORTFOLIO_CONFIG.githubUsername),
        fetchPortfolioReadme(force)
      ]);
      setActivityData(activity);
      setReadmeData(readme);
    } catch (err) {
      console.error('Failed to load GitHub activity data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const syncReadme = async () => {
    setRefreshingReadme(true);
    try {
      const readme = await fetchPortfolioReadme(true);
      setReadmeData(readme);
    } catch (err) {
      console.error('Failed to sync README:', err);
    } finally {
      setRefreshingReadme(false);
    }
  };

  const copyFullReadme = () => {
    if (!readmeData) return;
    navigator.clipboard.writeText(readmeData.rawMarkdown);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  useEffect(() => {
    loadData();

    // Listen for cross-component triggers (e.g. from About section)
    const handleOpenReadme = () => {
      setActiveTab('readme');
      const el = document.getElementById('github');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('open-github-readme', handleOpenReadme);
    return () => {
      window.removeEventListener('open-github-readme', handleOpenReadme);
    };
  }, []);

  // Filter weeks based on selected calendar span
  const displayedWeeks = useMemo(() => {
    if (!activityData) return [];
    if (calendarViewSpan === 'half') {
      return activityData.weeks.slice(-26);
    }
    return activityData.weeks;
  }, [activityData, calendarViewSpan]);

  // Compute month labels positions across columns
  const monthLabels = useMemo(() => {
    if (!displayedWeeks || displayedWeeks.length === 0) return [];
    const labels: { colIndex: number; label: string }[] = [];
    let lastMonth = -1;

    displayedWeeks.forEach((week, idx) => {
      // Look at middle of week (Wednesday) or first day
      const targetDay = week[3] || week[0];
      if (!targetDay) return;
      const date = new Date(targetDay.date);
      const month = date.getMonth();

      if (month !== lastMonth) {
        // Ensure some spacing between month names
        if (labels.length === 0 || idx - labels[labels.length - 1].colIndex >= 3) {
          labels.push({
            colIndex: idx,
            label: date.toLocaleString('en-US', { month: 'short' }),
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [displayedWeeks]);

  // Format date helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Find peak month in trends
  const peakMonth = useMemo(() => {
    if (!activityData?.monthlyTrends.length) return null;
    return [...activityData.monthlyTrends].sort((a, b) => b.commits - a.commits)[0];
  }, [activityData]);

  // Calculate monthly average
  const monthlyAverage = useMemo(() => {
    if (!activityData?.monthlyTrends.length) return 0;
    const total = activityData.monthlyTrends.reduce((sum, m) => sum + m.commits, 0);
    return Math.round(total / activityData.monthlyTrends.length);
  }, [activityData]);

  return (
    <section id="github" className="py-20 bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 mb-3">
              <Activity size={13} className="text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>GitHub API Activity & Dynamic Repository README</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Code Velocity & Public Activity
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Live GitHub contribution activity, coding velocity trends, and dynamic portfolio README specifications fetched directly from the GitHub API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('readme')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                activeTab === 'readme'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 border-purple-200 dark:border-purple-800'
              }`}
            >
              <FileText size={13} />
              <span>View Portfolio README</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors disabled:opacity-50"
              title="Refresh GitHub API data"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin text-purple-600 dark:text-purple-400" : ""} />
              <span>{refreshing ? "Refreshing..." : "Sync Live API"}</span>
            </button>

            <a
              href={PORTFOLIO_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-purple-700 dark:hover:bg-purple-600 border border-slate-700/60 shadow-xs transition-colors"
            >
              <Github size={14} />
              <span>@{PORTFOLIO_CONFIG.githubUsername}</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>
        </div>

        {/* Real-time GitHub Profile & High-level Metrics Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-purple-50/20 to-slate-50 dark:from-[#0c121e] dark:via-[#111726] dark:to-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* User profile snippet */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={activityData?.profile.avatar_url || `https://github.com/${PORTFOLIO_CONFIG.githubUsername}.png`}
                  alt={PORTFOLIO_CONFIG.name}
                  className="w-14 h-14 rounded-full border-2 border-purple-500/50 shadow-md object-cover bg-slate-800"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" title="Active on GitHub"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activityData?.profile.name || PORTFOLIO_CONFIG.name}
                  </h3>
                  <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                    @{activityData?.profile.login || PORTFOLIO_CONFIG.githubUsername}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {activityData?.profile.bio || "Full-Stack Software Engineer • .NET • Angular • Flutter • PostgreSQL"}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {activityData?.isLive ? "Live GitHub Connection" : "Cached Activity Sync"}
                  </span>
                  <span>•</span>
                  <span>Updated {activityData?.lastUpdated || "today"}</span>
                </div>
              </div>
            </div>

            {/* Quick 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200/80 dark:border-slate-800">
              <div className="px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                  <GitCommit size={13} className="text-purple-600 dark:text-purple-400" />
                  <span>Contributions</span>
                </div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                  {activityData?.totalContributions ? `${activityData.totalContributions}+` : '1,420+'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Past 12 months</div>
              </div>

              <div className="px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-600 dark:text-amber-400 mb-1">
                  <Flame size={13} className="text-amber-500 fill-amber-500" />
                  <span>Current Streak</span>
                </div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                  {activityData?.currentStreak ? `${activityData.currentStreak} Days` : '6 Days'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Continuous commits</div>
              </div>

              <div className="px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-blue-600 dark:text-blue-400 mb-1">
                  <TrendingUp size={13} className="text-blue-500" />
                  <span>Longest Streak</span>
                </div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                  {activityData?.longestStreak ? `${activityData.longestStreak} Days` : '24 Days'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Peak velocity</div>
              </div>

              <div className="px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                  <Code2 size={13} className="text-emerald-500" />
                  <span>Public Repos</span>
                </div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                  {activityData?.profile.public_repos || 22}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Repositories online</div>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive View Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === 'calendar'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Calendar size={14} />
              <span>Contribution Heatmap</span>
            </button>

            <button
              onClick={() => setActiveTab('trends')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === 'trends'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 size={14} />
              <span>Coding Velocity Trends</span>
            </button>

            <button
              onClick={() => setActiveTab('languages')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === 'languages'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Layers size={14} />
              <span>Tech & Languages</span>
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === 'recent'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Clock size={14} />
              <span>Recent Commit Feed</span>
              {activityData?.recentEvents.length ? (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-900 text-purple-200">
                  {activityData.recentEvents.length}
                </span>
              ) : null}
            </button>

            {/* TAB 5: Live README (About Me) */}
            <button
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeTab === 'readme'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-purple-950/60'
              }`}
            >
              <FileText size={14} />
              <span>Live README (About Me)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>

          {activeTab === 'calendar' && (
            <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200/80 dark:border-slate-800">
              <button
                onClick={() => setCalendarViewSpan('full')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  calendarViewSpan === 'full'
                    ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                12 Months (52 wks)
              </button>
              <button
                onClick={() => setCalendarViewSpan('half')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  calendarViewSpan === 'half'
                    ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                6 Months (26 wks)
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Contribution Heatmap */}
        {activeTab === 'calendar' && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-10 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2">
                <GitCommit size={15} className="text-purple-600 dark:text-purple-400" />
                <span>GitHub Contribution Heatmap • {calendarViewSpan === 'full' ? 'Past 52 Weeks' : 'Past 26 Weeks'}</span>
              </span>

              {/* Legend */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Less</span>
                <span className="w-3 h-3 rounded-[2px] bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800" title="0 contributions"></span>
                <span className="w-3 h-3 rounded-[2px] bg-purple-200 dark:bg-purple-950 border border-purple-300 dark:border-purple-900/60" title="1-2 contributions"></span>
                <span className="w-3 h-3 rounded-[2px] bg-purple-400 dark:bg-purple-800 border border-purple-500 dark:border-purple-700/80" title="3-5 contributions"></span>
                <span className="w-3 h-3 rounded-[2px] bg-purple-600 dark:bg-purple-600 border border-purple-700 dark:border-purple-500" title="6-8 contributions"></span>
                <span className="w-3 h-3 rounded-[2px] bg-purple-800 dark:bg-purple-400 border border-purple-900 dark:border-purple-300" title="9+ contributions"></span>
                <span>More</span>
              </div>
            </div>

            {/* Calendar Heatmap Container with Horizontal Scroll */}
            <div className="overflow-x-auto pb-2 scrollbar-thin">
              <div className="inline-block min-w-full">
                
                {/* Month labels row */}
                <div className="flex mb-1 pl-8 text-[11px] font-mono text-slate-500 dark:text-slate-400 relative h-5 select-none">
                  {monthLabels.map((m) => (
                    <span
                      key={`${m.colIndex}-${m.label}`}
                      style={{
                        position: 'absolute',
                        left: `${m.colIndex * 15 + 32}px`,
                      }}
                      className="font-medium"
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Day-of-week labels + Grid columns */}
                <div className="flex gap-2">
                  
                  {/* Left Day labels (Mon, Wed, Fri) */}
                  <div className="flex flex-col justify-between py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 select-none w-6 h-[100px]">
                    <span className="h-3 flex items-center"></span>
                    <span className="h-3 flex items-center">Mon</span>
                    <span className="h-3 flex items-center"></span>
                    <span className="h-3 flex items-center">Wed</span>
                    <span className="h-3 flex items-center"></span>
                    <span className="h-3 flex items-center">Fri</span>
                    <span className="h-3 flex items-center"></span>
                  </div>

                  {/* Heatmap Grid */}
                  <div className="flex gap-[3px]">
                    {displayedWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3px]">
                        {week.map((day) => {
                          const isSelected = selectedDay?.date === day.date;
                          return (
                            <button
                              key={day.date}
                              onClick={() => setSelectedDay(day)}
                              onMouseEnter={() => setSelectedDay(day)}
                              title={`${formatDate(day.date)}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                              aria-label={`${formatDate(day.date)}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                              className={`w-[11.5px] h-[11.5px] rounded-[2px] border transition-all duration-150 cursor-pointer ${
                                isSelected
                                  ? 'ring-2 ring-purple-500 ring-offset-1 dark:ring-offset-slate-900 z-10 scale-125'
                                  : 'hover:scale-115'
                              } dark:${LEVEL_COLORS_DARK[day.level]} ${LEVEL_COLORS_LIGHT[day.level]}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* Selected Day Inspect Card / Details Bar */}
            <div className="mt-4 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  {selectedDay ? selectedDay.count : (activityData?.currentStreak || '⚡')}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {selectedDay ? formatDate(selectedDay.date) : "Hover or click any cell above"}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedDay ? (
                      selectedDay.count === 0 
                        ? 'No recorded public contributions on this date' 
                        : `${selectedDay.count} contribution${selectedDay.count > 1 ? 's' : ''} logged`
                    ) : (
                      'Shows real commits, pull requests, and verified GitHub contributions'
                    )}
                  </div>
                </div>
              </div>

              {selectedDay?.details && selectedDay.details.length > 0 && (
                <div className="text-[11px] text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-3 py-1.5 rounded-lg border border-purple-200/60 dark:border-purple-900/60 max-w-md truncate">
                  {selectedDay.details[0]}
                </div>
              )}

              <div className="flex items-center gap-2 self-end sm:self-auto text-slate-500 dark:text-slate-400 text-[11px]">
                <span>Verified Git Tree</span>
                <ShieldCheck size={14} className="text-emerald-500" />
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Coding Velocity Trends */}
        {activeTab === 'trends' && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200/60 dark:border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2 text-sm">
                  <TrendingUp size={16} className="text-purple-600 dark:text-purple-400" />
                  Monthly Commit Velocity & Activity Momentum
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  12-month timeline tracking sustained engineering output across C#, Angular, and Flutter development
                </p>
              </div>

              {peakMonth && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs">
                  <Flame size={14} className="text-amber-500" />
                  <span>Peak: <strong>{peakMonth.commits} commits</strong> in {peakMonth.month}</span>
                </div>
              )}
            </div>

            {/* Responsive Monthly Trend Bar Visual */}
            <div className="space-y-4">
              <div className="h-56 flex items-end justify-between gap-2 pt-8 pb-4 px-2 border-b border-slate-200 dark:border-slate-800">
                {activityData?.monthlyTrends.map((m) => {
                  const maxCommits = Math.max(...(activityData.monthlyTrends.map(t => t.commits) || [100]));
                  const heightPercent = Math.max(Math.round((m.commits / maxCommits) * 100), 12);
                  const isPeak = peakMonth?.month === m.month;

                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 px-2 py-1 rounded bg-slate-900 dark:bg-slate-800 text-[10px] text-white font-mono shadow-md text-center pointer-events-none whitespace-nowrap">
                        {m.commits} commits ({m.activeDays} active days)
                      </div>

                      {/* Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[40px] rounded-t-lg transition-all duration-300 relative ${
                          isPeak
                            ? 'bg-gradient-to-t from-purple-700 to-purple-500 shadow-md shadow-purple-500/20'
                            : 'bg-gradient-to-t from-slate-300 to-purple-400/80 dark:from-slate-800 dark:to-purple-700/70 hover:from-purple-600 hover:to-purple-400'
                        }`}
                      >
                        {isPeak && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-slate-900"></span>
                        )}
                      </div>

                      {/* Month Label */}
                      <span className="mt-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                        {m.shortMonth}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Velocity Insights Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">Monthly Average</div>
                  <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    ~{monthlyAverage} Commits
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Consistent sprint pacing</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">Active Days Ratio</div>
                  <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {activityData?.activeDaysCount ? `${Math.round((activityData.activeDaysCount / 365) * 100)}%` : '78%'}
                  </div>
                  <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
                    <Activity size={12} />
                    <span>{activityData?.activeDaysCount || 284} active coding days</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">Primary Discipline</div>
                  <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    Full-Stack & APIs
                  </div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
                    <Code2 size={12} />
                    <span>.NET • Angular • Flutter • SQL</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Tech & Languages */}
        {activeTab === 'languages' && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-10">
            <div className="mb-6 pb-3 border-b border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2 text-sm font-mono">
                <Layers size={16} className="text-purple-600 dark:text-purple-400" />
                Repository Language Distribution
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Aggregated from public GitHub repositories indicating core technical proficiencies
              </p>
            </div>

            {/* Segmented multi-color progress bar */}
            <div className="h-4 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800 mb-6 shadow-inner">
              {activityData?.languageStats.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                  title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
                  className="h-full transition-all duration-500 hover:brightness-110"
                />
              ))}
            </div>

            {/* Language Breakdown Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {activityData?.languageStats.map((lang) => (
                <div
                  key={lang.name}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                        {lang.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {lang.count} {lang.count === 1 ? 'repository' : 'repositories'}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold font-mono text-purple-600 dark:text-purple-400">
                    {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Recent Commit Feed */}
        {activeTab === 'recent' && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-10">
            <div className="mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                <Clock size={15} className="text-purple-600 dark:text-purple-400" />
                Latest Public GitHub Activity & Push Events
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                Live GitHub Event Stream
              </span>
            </div>

            <div className="space-y-3">
              {activityData?.recentEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 mt-0.5 sm:mt-0">
                      <GitCommit size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={ev.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
                        >
                          {ev.repoName}
                          <ArrowUpRight size={12} className="opacity-60" />
                        </a>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                          {ev.type}
                        </span>
                        {ev.commitCount > 1 && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            +{ev.commitCount} commits
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-mono">
                        {ev.message || "Pushed updates to repository"}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap self-end sm:self-auto">
                    {new Date(ev.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Dynamic Portfolio README (About Me) */}
        {activeTab === 'readme' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs mb-10 transition-all">
            
            {/* README Top Action & Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                      {readmeData?.repoName || `${PORTFOLIO_CONFIG.githubUsername}/Portfolio`} / README.md
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{readmeData?.isLive ? 'Live Sync' : 'Active'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Main portfolio repository markdown documentation • Updated {readmeData?.fetchedAt || 'recently'}
                  </p>
                </div>
              </div>

              {/* View Switcher & Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200/80 dark:border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setReadmeViewMode('rendered')}
                    className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                      readmeViewMode === 'rendered'
                        ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Rendered
                  </button>
                  <button
                    onClick={() => setReadmeViewMode('raw')}
                    className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                      readmeViewMode === 'raw'
                        ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Raw Markdown
                  </button>
                </div>

                <button
                  onClick={copyFullReadme}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                  title="Copy full README markdown"
                >
                  {copiedReadme ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={syncReadme}
                  disabled={refreshingReadme}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors disabled:opacity-50"
                  title="Force re-fetch from GitHub repository"
                >
                  <RefreshCw size={13} className={refreshingReadme ? "animate-spin text-purple-500" : ""} />
                  <span>{refreshingReadme ? "Syncing..." : "Sync README"}</span>
                </button>

                <a
                  href={`https://github.com/${PORTFOLIO_CONFIG.githubUsername}/Portfolio/blob/main/README.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <span>Open on GitHub</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>
            </div>

            {/* Dynamic 'About Me' Sync Highlight Banner */}
            <div className="mb-8 p-5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-200 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200">
                      Live 'About Me' Source
                    </span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-mono">
                      Dynamic Repository Overview
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {readmeData?.overviewText || "This portfolio is designed to present Abdulfetah Bedru as a full-stack software engineer with a strong focus on modern web application development, scalable systems, and high-quality product engineering."}
                  </p>
                </div>

                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors shrink-0"
                >
                  <span>Synced with Page About Section</span>
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* Dynamic Feature Tags parsed from README */}
              {readmeData?.highlights && readmeData.highlights.length > 0 && (
                <div className="mt-4 pt-3 border-t border-purple-200/60 dark:border-purple-900/40 flex flex-wrap gap-1.5">
                  {readmeData.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-purple-200/80 dark:border-purple-900/60"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Display: Rendered Markdown or Raw Markdown */}
            {readmeViewMode === 'rendered' ? (
              <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#070b13] border border-slate-200/80 dark:border-slate-800 shadow-inner">
                {readmeData ? (
                  <MarkdownViewer content={readmeData.rawMarkdown} />
                ) : (
                  <div className="flex items-center justify-center py-16 text-slate-400 font-mono text-xs">
                    Loading README from repository...
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[#0d1117] text-slate-200 font-mono text-xs shadow-md">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/60 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 uppercase font-semibold text-purple-400">
                    <Terminal size={13} />
                    README.md (Raw Markdown)
                  </span>
                  <span>{readmeData?.rawMarkdown.length || 0} characters</span>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-[12px] leading-relaxed font-mono whitespace-pre text-slate-300">
                  <code>{readmeData?.rawMarkdown}</code>
                </pre>
              </div>
            )}

            {/* Footer with Attribution */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Synchronized via GitHub REST API & Raw Contents Service</span>
              </div>
              <a
                href={`https://github.com/${PORTFOLIO_CONFIG.githubUsername}/Portfolio`}
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
              >
                <span>github.com/{PORTFOLIO_CONFIG.githubUsername}/Portfolio</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>
        )}

        {/* Featured Repository Cards Grid Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Code2 size={20} className="text-purple-600 dark:text-purple-400" />
              Featured Open-Source Repositories
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Production architectures, reusable templates, and full-stack software repositories
            </p>
          </div>
        </div>

        {/* Featured Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURED_REPOSITORIES.map((repo) => (
            <div
              key={repo.name}
              className="p-5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-purple-300 dark:hover:border-purple-800/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
                  >
                    <Code2 size={16} className="text-purple-600 dark:text-purple-400" />
                    {repo.name}
                  </a>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label={`Open repository ${repo.name}`}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${repo.language === 'C#' ? 'bg-purple-600' : 'bg-blue-500'}`}></span>
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} />
                    {repo.forks}
                  </span>
                </div>
                <span>{repo.updated}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GitHubSection;
