import React, { useState } from 'react';
import { Layers, Box, Terminal, Search, CheckCircle2 } from 'lucide-react';
import { PrototypeItem } from '../types/prototype';

interface ComponentTreeInspectorProps {
  prototype: PrototypeItem;
}

export default function ComponentTreeInspector({ prototype }: ComponentTreeInspectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const components = prototype.analysis.componentTree || [];

  const filteredComponents = components.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || c.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Layout':
        return 'text-sky-400 bg-sky-950/30 border-sky-800/50';
      case 'Control':
        return 'text-indigo-400 bg-indigo-950/30 border-indigo-800/50';
      case 'DataDisplay':
        return 'text-emerald-400 bg-emerald-950/30 border-emerald-800/50';
      case 'Feedback':
        return 'text-amber-400 bg-amber-950/30 border-amber-800/50';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-8 bg-slate-950 text-slate-100 overflow-y-auto max-w-5xl mx-auto space-y-6 select-text">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Component Hierarchy & Tree Inspector
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing component boundaries, state contracts, and modular composition for {prototype.title}.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search components..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44"
            />
          </div>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Layout">Layout</option>
            <option value="Control">Control</option>
            <option value="DataDisplay">DataDisplay</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
      </div>

      {/* Component Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredComponents.map((comp, idx) => (
          <div
            key={idx}
            className="p-5 border border-slate-800 bg-slate-900/40 rounded-xl space-y-3 transition-colors hover:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-semibold text-white font-mono">{comp.name}</span>
              </div>
              <span className={`px-2 py-0.5 text-[11px] font-medium rounded border ${getTypeBadge(comp.type)}`}>
                {comp.type}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {comp.purpose}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">States:</span>
                {comp.states.map((st, i) => (
                  <span key={i} className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-1.5 py-0.5 rounded">
                    {st}
                  </span>
                ))}
              </div>

              {comp.linesOfCode && (
                <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                  ~{comp.linesOfCode} LOC
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
