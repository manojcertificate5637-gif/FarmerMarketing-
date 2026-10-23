import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Download, Copy, Check, Info } from 'lucide-react';
import { PrototypeItem } from '../types/prototype';

interface AnalysisPanelProps {
  prototype: PrototypeItem;
  onRunAudit: () => void;
  isAnalyzing: boolean;
}

export default function AnalysisPanel({
  prototype,
  onRunAudit,
  isAnalyzing
}: AnalysisPanelProps) {
  const [copiedReport, setCopiedReport] = useState(false);
  const { analysis } = prototype;

  const handleCopyReport = () => {
    const reportText = `# Architectural Prototype Audit Report
Target: ${analysis.title}
Generated: ${new Date().toLocaleDateString()}

## Executive Summary
${analysis.overview}

## Readiness Scores
- Overall Score: ${analysis.scores.overall}/100
- UX Architecture: ${analysis.scores.uxArchitecture}/100
- Design System: ${analysis.scores.designSystem}/100
- Accessibility: ${analysis.scores.accessibility}/100
- Performance: ${analysis.scores.performance}/100

## Design System & Anti-Slop Audit
- Typography: ${analysis.designSystemAudit.typography}
- Spacing & Math: ${analysis.designSystemAudit.spacingAndMath}
- Color Budget: ${analysis.designSystemAudit.colorDistribution}
- Anti-Slop Rules: ${analysis.designSystemAudit.antiSlopCompliance}

## Actionable Recommendations
${analysis.actionableRecommendations.map(r => `### [${r.priority}] ${r.title} (${r.category})
${r.description}
Fix: ${r.suggestedFix}
`).join('\n')}
`;
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return 'text-rose-400 bg-rose-950/40 border-rose-900/60';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/40 border-amber-900/60';
      case 'Low':
        return 'text-slate-300 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-8 bg-slate-950 text-slate-100 overflow-y-auto max-w-6xl mx-auto space-y-8 select-text">
      {/* Target URL Reference Banner (specifically handles user request) */}
      {prototype.urlOrRef && (
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs">
              <span className="font-semibold text-white">Target Reference: </span>
              <span className="font-mono text-slate-300 break-all">{prototype.urlOrRef}</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Google AI Studio applet URLs require private user authentication. This inspector synthesizes the running prototype directly with full architectural audit.
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 shrink-0"
          >
            {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReport ? 'Report Copied' : 'Export Audit'}</span>
          </button>
        </div>
      )}

      {/* Top Section: Title & Executive Overview */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {analysis.title}
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
          {analysis.overview}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
          <span>Components: <strong className="text-slate-200 font-mono tabular-nums">{analysis.metrics.componentCount}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Interactive Controls: <strong className="text-slate-200 font-mono tabular-nums">{analysis.metrics.interactiveAffordances}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Accessibility: <strong className="text-emerald-400 font-medium">{analysis.metrics.layoutScore}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Color Distribution: <strong className="text-slate-200 font-medium">{analysis.metrics.colorBudget}</strong></span>
        </div>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Overall Readiness', score: analysis.scores.overall, highlight: true },
          { label: 'UX Architecture', score: analysis.scores.uxArchitecture, highlight: false },
          { label: 'Design System', score: analysis.scores.designSystem, highlight: false },
          { label: 'Accessibility', score: analysis.scores.accessibility, highlight: false },
          { label: 'Performance', score: analysis.scores.performance, highlight: false }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              item.highlight
                ? 'bg-indigo-950/30 border-indigo-500/40 text-white'
                : 'bg-slate-900/50 border-slate-800 text-slate-200'
            }`}
          >
            <div className="text-xs text-slate-400 font-medium">{item.label}</div>
            <div className="text-2xl font-bold font-mono tabular-nums mt-1 text-white">
              {item.score}<span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                style={{ width: `${item.score}%` }}
                className={`h-full ${item.highlight ? 'bg-indigo-500' : 'bg-emerald-400'}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Architectural Breakdown Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/70 text-xs font-semibold text-slate-200">
          Architectural Layer Verification
        </div>
        <div className="divide-y divide-slate-800/80">
          {analysis.architecturalBreakdown.map((layer, index) => (
            <div key={index} className="p-4 sm:flex items-start justify-between gap-4">
              <div className="space-y-1 sm:max-w-md">
                <div className="text-xs font-semibold text-white">{layer.layer}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{layer.findings}</div>
              </div>
              <div className="mt-2 sm:mt-0 shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border ${
                  layer.status === 'Optimal'
                    ? 'text-emerald-400 bg-emerald-950/30 border-emerald-900/60'
                    : 'text-amber-400 bg-amber-950/30 border-amber-900/60'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{layer.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design System & Anti-Slop Discipline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/40 space-y-3">
          <div className="text-xs font-semibold text-slate-200">Design System Discipline</div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Typography Hierarchy</span>
              <span className="text-slate-200">{analysis.designSystemAudit.typography}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Spatial Math & Padding</span>
              <span className="text-slate-200">{analysis.designSystemAudit.spacingAndMath}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">60-30-10 Color Balance</span>
              <span className="text-slate-200">{analysis.designSystemAudit.colorDistribution}</span>
            </div>
          </div>
        </div>

        <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/40 space-y-3">
          <div className="text-xs font-semibold text-slate-200">Anti-Slop Audit Compliance</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {analysis.designSystemAudit.antiSlopCompliance}
          </p>
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Zero-pill metadata discipline (unboxed text with mid-dot dividers)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>No mechanical code-comment headers (// 01 ARCHITECTURE banned)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>No decorative pulsing status dots or fake compiler engines</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Single-line controls with strict whitespace-nowrap discipline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            Actionable Optimization Recommendations
          </h3>
          <span className="text-xs text-slate-400 font-mono tabular-nums">
            {analysis.actionableRecommendations.length} Items Identified
          </span>
        </div>

        <div className="space-y-3">
          {analysis.actionableRecommendations.map((item, index) => (
            <div
              key={index}
              className="p-5 border border-slate-800 rounded-xl bg-slate-900/40 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2 py-0.5 text-[11px] font-semibold rounded border ${getPriorityColor(item.priority)}`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {item.category}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-semibold text-white">
                    {item.title}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-[11px] text-indigo-300">
                <span className="text-slate-500 font-sans block mb-1">Recommended implementation:</span>
                <code>{item.suggestedFix}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
