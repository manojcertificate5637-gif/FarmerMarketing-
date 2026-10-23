import React from 'react';
import { Sparkles, Play, Search, Code, CheckCircle, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'viewport' | 'audit' | 'components' | 'code';
  setActiveTab: (tab: 'viewport' | 'audit' | 'components' | 'code') => void;
  onOpenImport: () => void;
  onRunAudit: () => void;
  isAnalyzing: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  onOpenImport,
  onRunAudit,
  isAnalyzing
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950 shrink-0">
      {/* Zone 1: Single text element wordmark (Display face, no descriptors/pill badges) */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveTab('viewport'); }}
        className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-indigo-400 transition-colors"
      >
        Prototype Inspector
      </a>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('viewport')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'viewport' ? 'text-white font-semibold' : ''
          }`}
        >
          Live Viewport
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'audit' ? 'text-white font-semibold' : ''
          }`}
        >
          Architectural Audit
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'components' ? 'text-white font-semibold' : ''
          }`}
        >
          Component Tree
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'code' ? 'text-white font-semibold' : ''
          }`}
        >
          Source Code
        </button>
        <button
          onClick={onOpenImport}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-slate-400"
        >
          Import / URL
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRunAudit}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Deep Audit</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
