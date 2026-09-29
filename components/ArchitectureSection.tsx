import React, { useState } from 'react';
import { ARCHITECTURE_FLOWS } from '../config/portfolio';
import { ArchitectureDiagramNode } from '../types';
import { 
  Layers, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Code, 
  Terminal, 
  ArrowRight,
  Sparkles,
  Info,
  Smartphone,
  Key,
  Lock,
  Server,
  Database,
  Check
} from 'lucide-react';

const FLOW_ICONS: Record<string, React.ElementType> = {
  'mobile-arch': Smartphone,
  'backend-arch': Layers,
  'security-arch': ShieldCheck,
  'fullstack-arch': Globe,
  'testing-arch': CheckCircle2
};

const FLUTTER_CAPABILITIES = [
  "Cross-platform application development",
  "Reusable widgets",
  "Responsive mobile interfaces",
  "API integration",
  "Authentication",
  "State management",
  "Local persistence"
];

const AUTH_SUBFLOW_STEPS = [
  {
    id: 'auth-1',
    label: 'Flutter',
    badge: 'Mobile Client',
    desc: 'Stores encrypted JWT in FlutterSecureStorage and injects bearer tokens into outgoing requests via HTTP Client.',
    icon: Smartphone
  },
  {
    id: 'auth-2',
    label: 'Authentication',
    badge: 'Identity Protocol',
    desc: 'Validates student credentials, enforces password hashes with PBKDF2/Argon2, and verifies active enrollment status.',
    icon: Lock
  },
  {
    id: 'auth-3',
    label: 'JWT',
    badge: 'Cryptographic Token',
    desc: 'Compact RFC 7519 token carrying claims (User ID, Role, Expiration) signed with asymmetric HMAC-SHA256 secrets.',
    icon: Key
  },
  {
    id: 'auth-4',
    label: 'ASP.NET Core API',
    badge: 'Endpoint Security',
    desc: 'JwtBearer authentication middleware validates token integrity, verifies issuer/audience, and builds ClaimsPrincipal.',
    icon: Server
  }
];

const ArchitectureSection: React.FC = () => {
  const [activeFlowId, setActiveFlowId] = useState<string>('mobile-arch');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('mob-node-1');
  const [selectedAuthStep, setSelectedAuthStep] = useState<string>('auth-1');

  const currentFlow = ARCHITECTURE_FLOWS.find(f => f.id === activeFlowId) || ARCHITECTURE_FLOWS[0];
  const activeNode = currentFlow.nodes.find(n => n.id === selectedNodeId) || currentFlow.nodes[0];

  const handleFlowChange = (flowId: string) => {
    setActiveFlowId(flowId);
    const flow = ARCHITECTURE_FLOWS.find(f => f.id === flowId);
    if (flow && flow.nodes.length > 0) {
      setSelectedNodeId(flow.nodes[0].id);
    }
  };

  const isFlutterNode = activeNode?.label.toLowerCase().includes('flutter');
  const activeAuthItem = AUTH_SUBFLOW_STEPS.find(s => s.id === selectedAuthStep) || AUTH_SUBFLOW_STEPS[0];

  return (
    <section id="architecture" className="py-20 bg-slate-50/50 dark:bg-[#070b13] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            System Design
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Architecture &amp; Engineering Stack
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Interactive blueprints representing mobile architectures, backend layers, security boundaries, and relational data flows.
          </p>
        </div>

        {/* Flow Selection Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            {ARCHITECTURE_FLOWS.map((flow) => {
              const Icon = FLOW_ICONS[flow.id] || Layers;
              const isActive = activeFlowId === flow.id;
              const isMobile = flow.id === 'mobile-arch';

              return (
                <button
                  key={flow.id}
                  onClick={() => handleFlowChange(flow.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    isActive
                      ? isMobile
                        ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-2xs'
                        : 'bg-purple-700 dark:bg-purple-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  <span>{flow.title}</span>
                  {isMobile && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-200 border border-cyan-400/40">
                      Mobile Stack
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Diagram Canvas */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8">
          
          <div className="mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                {currentFlow.subtitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {currentFlow.flowSummary}
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
              <Info size={12} /> Click node to inspect details
            </div>
          </div>

          {/* Node Visual Chain */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${currentFlow.nodes.length} gap-3 mb-8`}>
            {currentFlow.nodes.map((node, idx) => {
              const isSelected = selectedNodeId === node.id;
              const isNodeFlutter = node.label.toLowerCase().includes('flutter');

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl text-left border transition-all relative flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    isSelected
                      ? isNodeFlutter
                        ? 'bg-cyan-50/80 dark:bg-cyan-950/60 border-cyan-500/80 dark:border-cyan-500 shadow-xs scale-102'
                        : 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-500/80 dark:border-purple-600 shadow-xs scale-102'
                      : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                      <span>Node 0{idx + 1}</span>
                      {isSelected && (
                        <span className={`w-1.5 h-1.5 rounded-full ${isNodeFlutter ? 'bg-cyan-500' : 'bg-purple-600'}`} />
                      )}
                    </div>
                    <h3 className={`text-xs sm:text-sm font-bold leading-tight mb-1 ${
                      isSelected 
                        ? isNodeFlutter ? 'text-cyan-900 dark:text-cyan-300' : 'text-purple-900 dark:text-white' 
                        : 'text-slate-900 dark:text-slate-200'
                    }`}>
                      {node.label}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {node.sublabel}
                    </p>
                  </div>

                  <span className={`text-[10px] font-mono mt-3 block truncate ${
                    isNodeFlutter ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : 'text-purple-700 dark:text-purple-300'
                  }`}>
                    {node.tech.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Drawer */}
          {activeNode && (
            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                      isFlutterNode
                        ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800'
                        : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    }`}>
                      {activeNode.sublabel}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {activeNode.label}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeNode.description}
                  </p>

                  {/* Requirement 3: When the user clicks Flutter, show all 7 capabilities! */}
                  {isFlutterNode && (
                    <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                        Flutter Mobile Architecture Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {FLUTTER_CAPABILITIES.map((cap) => (
                          <div key={cap} className="flex items-center gap-1.5 text-xs text-slate-200">
                            <Check size={12} className="text-cyan-400 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs font-mono text-purple-700 dark:text-purple-300">
                    <span className="text-slate-400 text-[11px] block">Core Technologies:</span>
                    {activeNode.tech}
                  </div>
                </div>

                {/* Code Snippet Tile */}
                {activeNode.codeSnippet && (
                  <div className="lg:col-span-6 rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs font-mono text-slate-200 overflow-x-auto">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 border-b border-slate-800 pb-1.5">
                      <span>Implementation Pattern</span>
                      <span className="text-emerald-400 font-medium">✓ Strongly Typed</span>
                    </div>
                    <pre className="text-[11px] leading-relaxed text-slate-300 overflow-x-auto max-h-40">
                      <code>{activeNode.codeSnippet}</code>
                    </pre>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Requirement 3: Secondary Flow: Flutter → Authentication → JWT → ASP.NET Core API */}
          <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-purple-950/30 border border-slate-700/60 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-cyan-400" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Mobile Security Flow: Flutter → Authentication → JWT → ASP.NET Core API
                </h4>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">
                End-to-End Cryptographic Security
              </span>
            </div>

            {/* Stepper Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {AUTH_SUBFLOW_STEPS.map((step, idx) => {
                const isSelected = selectedAuthStep === step.id;
                const Icon = step.icon;

                return (
                  <button
                    key={step.id}
                    onClick={() => setSelectedAuthStep(step.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-xs'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Icon size={14} className={isSelected ? 'text-cyan-400' : 'text-slate-400'} />
                        <span>{step.label}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">0{idx + 1}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                      {step.badge}
                    </span>
                    <p className="text-[10px] text-slate-400 line-clamp-2">
                      {step.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Auth Detail */}
            <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-400">{activeAuthItem.label}:</span>
                <span className="text-slate-300">{activeAuthItem.desc}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold shrink-0 hidden md:inline">
                ✓ Verified TLS 1.3
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ArchitectureSection;
