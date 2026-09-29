import React, { useState } from 'react';
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  Lock, 
  Mail, 
  BookOpen, 
  User, 
  CheckCircle2, 
  Clock, 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  GraduationCap, 
  Bell, 
  Compass, 
  Key,
  Calendar,
  Sparkles
} from 'lucide-react';

export type ScreenId = 'login' | 'dashboard' | 'courses' | 'details' | 'profile';

interface FlutterSmartphoneVisualProps {
  initialScreen?: ScreenId;
  compact?: boolean;
}

export const FlutterSmartphoneVisual: React.FC<FlutterSmartphoneVisualProps> = ({ 
  initialScreen = 'dashboard',
  compact = false 
}) => {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(initialScreen);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const screens: { id: ScreenId; label: string }[] = [
    { id: 'login', label: 'Login' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' },
    { id: 'details', label: 'Course Details' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Screen Selector Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-5 shadow-2xs">
        {screens.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScreen(s.id)}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              activeScreen === s.id
                ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Modern Smartphone Mockup Frame */}
      <div className={`relative ${compact ? 'w-[280px] h-[540px]' : 'w-[310px] sm:w-[330px] h-[620px]'} bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 transition-all`}>
        
        {/* Device Outer Buttons */}
        <div className="absolute -left-5 top-24 w-1 h-10 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-5 top-38 w-1 h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-5 top-54 w-1 h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -right-5 top-32 w-1 h-16 bg-slate-700 rounded-r-md" />

        {/* Screen Bezel Area */}
        <div className="w-full h-full bg-[#0a0f1d] rounded-[36px] overflow-hidden flex flex-col text-slate-100 relative font-sans border border-slate-800/80 select-none">
          
          {/* Status Bar */}
          <div className="h-7 px-5 pt-1.5 flex items-center justify-between text-[11px] font-mono text-slate-300 z-30">
            <span className="font-semibold text-[10px]">9:41</span>
            
            {/* Dynamic Island / Camera Notch */}
            <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 mr-1 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            <div className="flex items-center gap-1.5 text-[10px]">
              <Wifi size={10} />
              <span className="text-[9px] font-bold">5G</span>
              <Battery size={11} className="text-emerald-400" />
            </div>
          </div>

          {/* App Bar / Navigation Header */}
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              {activeScreen !== 'dashboard' && activeScreen !== 'login' && (
                <button 
                  onClick={() => setActiveScreen('dashboard')} 
                  className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                </button>
              )}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-bold text-xs tracking-tight text-white">
                  {activeScreen === 'login' && 'Student Portal'}
                  {activeScreen === 'dashboard' && 'TMS Mobile'}
                  {activeScreen === 'courses' && 'Course Catalog'}
                  {activeScreen === 'details' && 'Course Overview'}
                  {activeScreen === 'profile' && 'Student Profile'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                Flutter 3.x
              </span>
            </div>
          </div>

          {/* Screen Body Content */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 text-xs">
            
            {/* 1. LOGIN SCREEN */}
            {activeScreen === 'login' && (
              <div className="space-y-4 pt-4 animate-fade-in">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 mx-auto flex items-center justify-center shadow-lg shadow-cyan-900/40">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-sm text-white pt-1">Training Management</h3>
                  <p className="text-[10px] text-slate-400">Sign in to access your courses</p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Student Email</label>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                      <Mail size={12} className="text-slate-400" />
                      <span className="text-slate-200">alex.student@astu.edu.et</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Password</label>
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-slate-400" />
                        <span className="text-slate-400">{passwordVisible ? 'Passw0rd123!' : '••••••••••••'}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="text-[9px] text-cyan-400 font-mono"
                      >
                        {passwordVisible ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-cyan-500 accent-cyan-500" />
                      <span>Remember token</span>
                    </label>
                    <span className="text-cyan-400">Forgot?</span>
                  </div>

                  <button
                    onClick={() => setActiveScreen('dashboard')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-cyan-900/30 active:scale-98 transition-transform"
                  >
                    Sign In with JWT
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
                    <ShieldCheck size={11} /> Secure Token Storage
                  </div>
                  <p className="text-[9px] leading-tight">
                    Tokens are cryptographically encrypted with FlutterSecureStorage and injected into ASP.NET Core API requests.
                  </p>
                </div>
              </div>
            )}

            {/* 2. DASHBOARD SCREEN */}
            {activeScreen === 'dashboard' && (
              <div className="space-y-3.5 animate-fade-in">
                {/* User Welcome Card */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-900 border border-cyan-800/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400">Student ID: #ST-88214</span>
                      <h4 className="font-bold text-sm text-white">Alex Bedru</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-500/50 flex items-center justify-center font-bold text-xs text-cyan-300">
                      AB
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800 text-center">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 block">Enrolled</span>
                      <span className="font-bold text-xs text-white">4 Courses</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 block">Credits</span>
                      <span className="font-bold text-xs text-cyan-400">16 Total</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 block">GPA / Score</span>
                      <span className="font-bold text-xs text-emerald-400">3.88 / 92%</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Session Live Banner */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800/50 flex items-center gap-1">
                      <Clock size={9} /> Next Live Session
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">Today, 10:30 AM</span>
                  </div>
                  <h5 className="font-bold text-xs text-white">ASP.NET Core Web API Architecture</h5>
                  <p className="text-[10px] text-slate-400">Room 402 • Instructor: Dr. Tadesse</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setActiveScreen('courses')}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors"
                  >
                    <BookOpen size={14} className="text-cyan-400 mb-1" />
                    <span className="font-bold text-[11px] block text-white">Browse Courses</span>
                    <span className="text-[9px] text-slate-400">Active catalog</span>
                  </button>

                  <button 
                    onClick={() => setActiveScreen('profile')}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors"
                  >
                    <User size={14} className="text-purple-400 mb-1" />
                    <span className="font-bold text-[11px] block text-white">My Profile</span>
                    <span className="text-[9px] text-slate-400">Academic records</span>
                  </button>
                </div>

                {/* Recent Assessments */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Recent Assessments
                  </span>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="font-semibold text-white block">Midterm: EF Core Migrations</span>
                      <span className="text-[9px] text-slate-400">Score submitted: Oct 2026</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-xs">96 / 100</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. COURSES SCREEN */}
            {activeScreen === 'courses' && (
              <div className="space-y-3 animate-fade-in">
                {/* Search Bar */}
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    readOnly
                    value="Search 24+ courses..."
                    className="w-full pl-7 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] text-slate-400 focus:outline-none"
                  />
                </div>

                {/* Filter Chips */}
                <div className="flex gap-1 overflow-x-auto pb-1 text-[10px] font-mono">
                  {['All', 'Backend', 'Mobile', 'Web'].map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFilter(f)}
                      className={`px-2 py-0.5 rounded-full whitespace-nowrap ${
                        selectedFilter === f
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Courses List */}
                <div className="space-y-2">
                  {[
                    {
                      id: 'c1',
                      code: 'CS-401',
                      title: 'ASP.NET Core Web APIs & Clean Architecture',
                      credits: '4 Credits',
                      status: 'Enrolled',
                      statusColor: 'text-emerald-400 bg-emerald-950/70 border-emerald-800/60'
                    },
                    {
                      id: 'c2',
                      code: 'CS-402',
                      title: 'Cross-Platform Flutter & Dart Development',
                      credits: '4 Credits',
                      status: enrolledCourse ? 'Enrolled' : 'Open',
                      statusColor: enrolledCourse 
                        ? 'text-emerald-400 bg-emerald-950/70 border-emerald-800/60'
                        : 'text-cyan-400 bg-cyan-950/70 border-cyan-800/60'
                    },
                    {
                      id: 'c3',
                      code: 'CS-403',
                      title: 'Reactive Angular Signals & Enterprise Architecture',
                      credits: '3 Credits',
                      status: 'Enrolled',
                      statusColor: 'text-emerald-400 bg-emerald-950/70 border-emerald-800/60'
                    },
                    {
                      id: 'c4',
                      code: 'CS-404',
                      title: 'PostgreSQL Relational Internals & Indexing',
                      credits: '3 Credits',
                      status: 'Open',
                      statusColor: 'text-cyan-400 bg-cyan-950/70 border-cyan-800/60'
                    }
                  ].map(c => (
                    <div
                      key={c.id}
                      onClick={() => setActiveScreen('details')}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 cursor-pointer transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-400">{c.code}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${c.statusColor}`}>
                          {c.status}
                        </span>
                      </div>
                      <h5 className="font-bold text-[11px] text-white leading-tight">{c.title}</h5>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1">
                        <span>{c.credits}</span>
                        <span className="text-cyan-400 flex items-center gap-0.5">
                          View details <ChevronRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. COURSE DETAILS SCREEN */}
            {activeScreen === 'details' && (
              <div className="space-y-3 animate-fade-in">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-950/80 to-slate-900 border border-cyan-800/50 space-y-1">
                  <span className="text-[9px] font-mono text-cyan-400">Course Code: CS-402</span>
                  <h4 className="font-bold text-xs text-white leading-tight">
                    Cross-Platform Flutter & Dart Development
                  </h4>
                  <p className="text-[10px] text-slate-300">
                    4 Credit Hours • 12 Weeks • Certificate Track
                  </p>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Course Syllabus
                  </span>
                  {[
                    '01 — Dart Fundamentals & Asynchronous I/O',
                    '02 — Flutter Widget Tree & State Management',
                    '03 — REST API Integration & JSON Serialization',
                    '04 — JWT Authentication & Secure Local Storage'
                  ].map((s, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setEnrolledCourse(true);
                      setActiveScreen('courses');
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                      enrolledCourse 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40' 
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-900/40'
                    }`}
                  >
                    {enrolledCourse ? '✓ Enrolled in Course' : 'Enroll in Course (Instant Sync)'}
                  </button>
                </div>
              </div>
            )}

            {/* 5. PROFILE SCREEN */}
            {activeScreen === 'profile' && (
              <div className="space-y-3 animate-fade-in">
                <div className="text-center py-2 space-y-1">
                  <div className="w-14 h-14 rounded-full bg-cyan-600/30 border-2 border-cyan-500 mx-auto flex items-center justify-center font-bold text-sm text-cyan-300 shadow-md">
                    AB
                  </div>
                  <h4 className="font-bold text-sm text-white">Abdulfetah Bedru</h4>
                  <p className="text-[10px] text-slate-400">ASTU CSE · Student ID #ST-88214</p>
                </div>

                <div className="space-y-1.5 text-[10px]">
                  <span className="font-mono uppercase tracking-wider text-slate-400 block">
                    Security & Session State
                  </span>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1"><Key size={10} className="text-cyan-400" /> Bearer Token:</span>
                      <span className="font-mono text-emerald-400 font-bold">Verified Valid</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[9px]">
                      <span>Expires In:</span>
                      <span className="font-mono">23 hours, 45 mins</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1"><Layers size={10} className="text-purple-400" /> API Gateway:</span>
                      <span className="font-mono text-purple-300">/api/v1/tms</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[9px]">
                      <span>Protocol:</span>
                      <span className="font-mono">HTTPS (TLS 1.3)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveScreen('login')}
                  className="w-full py-2 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 font-bold text-xs mt-2"
                >
                  Log Out
                </button>
              </div>
            )}

          </div>

          {/* Device Bottom Home Indicator Bar */}
          <div className="h-6 flex items-center justify-center bg-slate-950">
            <div className="w-28 h-1 bg-slate-600 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
