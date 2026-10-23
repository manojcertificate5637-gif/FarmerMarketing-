import React, { useState } from 'react';
import { Play, Sparkles, Sliders, RefreshCw, Layers, CheckCircle2, Copy, Check } from 'lucide-react';

interface RunItem {
  id: string;
  model: string;
  prompt: string;
  output: string;
  latencyMs: number;
  tokens: number;
  timestamp: string;
}

export default function AIStudioAppletPrototype() {
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'>('gemini-3.8-flash');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [systemPrompt, setSystemPrompt] = useState('You are an expert AI design system architect and full-stack software engineer.');
  const [promptText, setPromptText] = useState('Analyze user interface telemetry and optimize responsive layout hierarchy for desktop (1440px) and mobile.');
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterModel, setFilterModel] = useState<string>('all');

  const [runs, setRuns] = useState<RunItem[]>([
    {
      id: 'run-8842',
      model: 'gemini-3.8-flash',
      prompt: 'Analyze user interface telemetry and optimize responsive layout hierarchy for desktop (1440px) and mobile.',
      output: `1. Spatial Math & Padding: Ensure container padding (24px) strictly exceeds inner child gap (16px).
2. Layout Baseline: 1440px desktop container with single-elevation card depth (border-slate-800).
3. Responsive Transition: At <768px, collapse multi-column telemetry strip to stacked cards while preserving 44px minimum touch targets.
4. WCAG Compliance: Maintain 4.5:1 text contrast on dark slate canvas and enforce tabular numbers (tabular-nums) for telemetry metrics.`,
      latencyMs: 148,
      tokens: 492,
      timestamp: 'Just now'
    },
    {
      id: 'run-8841',
      model: 'gemini-3.1-flash-lite',
      prompt: 'Summarize key performance metrics for cluster Asia-Southeast1',
      output: `Cluster Asia-Southeast1 is operating nominally. P99 latency is 38.2ms (-4.1ms improvement), active pod instances: 342, zero critical pod restarts in the last 24h.`,
      latencyMs: 92,
      tokens: 184,
      timestamp: '6 mins ago'
    },
    {
      id: 'run-8840',
      model: 'gemini-3.8-flash',
      prompt: 'Design system tokens: Define color distribution ratios for high-density SaaS',
      output: `Apply 60-30-10 distribution:
- 60% Canvas: Neutral slate-950 (#020617)
- 30% Structural: Slate-900 surfaces with 1px border-slate-800 dividers
- 10% Accent: High-intent Indigo-500 (#6366F1) strictly allocated to primary actions`,
      latencyMs: 162,
      tokens: 310,
      timestamp: '14 mins ago'
    }
  ]);

  const handleExecute = () => {
    if (!promptText.trim() || isExecuting) return;
    setIsExecuting(true);

    setTimeout(() => {
      const newRun: RunItem = {
        id: `run-${Math.floor(1000 + Math.random() * 9000)}`,
        model: selectedModel,
        prompt: promptText,
        output: `[Inference completed for ${selectedModel}]
Generated response based on prompt: "${promptText}"
Temperature: ${temperature.toFixed(2)}, TopP: ${topP.toFixed(2)}, MaxTokens: ${maxTokens}.

Evaluation Summary:
- UI hierarchy and component tree evaluated.
- Layout passes WCAG AA contrast rules and maintains zero-pill metadata discipline.
- Viewport baseline optimized for 1440px desktop with responsive mobile fallback.`,
        latencyMs: Math.floor(110 + Math.random() * 80),
        tokens: Math.floor(280 + Math.random() * 320),
        timestamp: 'Just now'
      };

      setRuns(prev => [newRun, ...prev]);
      setIsExecuting(false);
    }, 600);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredRuns = filterModel === 'all' ? runs : runs.filter(r => r.model === filterModel);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 select-text overflow-hidden">
      {/* 3-Zone Prototype Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-900/60 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-tight text-white">AI Studio Prototype (45f83cac)</span>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>·</span>
            <span>Multimodal Inference Studio</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{runs.length} Runs Logged</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setRuns(runs.slice(0, 1))}
            className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset history"
          >
            Clear Runs
          </button>
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isExecuting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Dual-Column Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Parameter Tuning Sidebar (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-800 bg-slate-900/30 p-5 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Model Selection</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', desc: 'Fast, high-throughput text & multimodal' },
                { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', desc: 'Ultra-low latency, lightweight runs' },
                { id: 'gemini-4-argon', name: 'Gemini 4 Argon', desc: 'Deep reasoning, coding & complex logic' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id as any)}
                  className={`text-left p-2.5 rounded-lg border transition-all ${
                    selectedModel === m.id
                      ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-medium text-white">{m.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Hyperparameter Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-800/80">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span>Temperature</span>
                <span className="font-mono text-indigo-400 tabular-nums">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="2.0"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.0 (Deterministic)</span>
                <span>2.0 (Creative)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span>Top-P</span>
                <span className="font-mono text-indigo-400 tabular-nums">{topP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={topP}
                onChange={e => setTopP(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span>Max Output Tokens</span>
                <span className="font-mono text-indigo-400 tabular-nums">{maxTokens}</span>
              </div>
              <input
                type="range"
                min="512"
                max="8192"
                step="256"
                value={maxTokens}
                onChange={e => setMaxTokens(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* System Instructions */}
          <div className="pt-2 border-t border-slate-800/80">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              System Instruction
            </label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-mono"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-2">
            <span className="text-[11px] text-slate-400 block mb-2">Prompt Presets</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Optimize responsive layout for desktop (1440px)',
                'Audit component tree for WCAG AA compliance',
                'Generate TypeScript interfaces for inference response'
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPromptText(preset)}
                  className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-left transition-colors"
                >
                  {preset.slice(0, 32)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Workspace & Telemetry (8 cols) */}
        <div className="lg:col-span-8 flex flex-col overflow-hidden bg-slate-950">
          {/* Prompt Entry Box */}
          <div className="p-5 border-b border-slate-800 bg-slate-900/40 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200">
                Inference Input Prompt
              </label>
              <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                {promptText.length} characters · approx. {Math.round(promptText.length / 4)} tokens
              </span>
            </div>
            <div className="relative">
              <textarea
                rows={3}
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                placeholder="Enter prompt to execute inference..."
                className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Filter Bar & Telemetry History */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800/80 bg-slate-900/20 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Filter Model:</span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-md">
                {['all', 'gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-4-argon'].map(m => (
                  <button
                    key={m}
                    onClick={() => setFilterModel(m)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      filterModel === m
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m === 'all' ? 'All' : m.replace('gemini-', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span>Avg Latency: <strong className="text-slate-200 font-mono tabular-nums">134ms</strong></span>
              <span>·</span>
              <span>Tokens Processed: <strong className="text-slate-200 font-mono tabular-nums">986</strong></span>
            </div>
          </div>

          {/* Runs Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {filteredRuns.map(run => (
              <div
                key={run.id}
                className="border border-slate-800 bg-slate-900/50 rounded-xl p-4 transition-all hover:border-slate-700 space-y-3"
              >
                {/* Run Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-indigo-400 font-medium">{run.id}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300 font-medium">{run.model}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{run.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono tabular-nums text-[11px]">
                      {run.latencyMs}ms · {run.tokens} tokens
                    </span>
                    <button
                      onClick={() => handleCopy(run.output, run.id)}
                      className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy output"
                    >
                      {copiedId === run.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Prompt Excerpt */}
                <div className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 font-mono">
                  &gt; {run.prompt}
                </div>

                {/* Output Body */}
                <div className="text-xs text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-800 whitespace-pre-line leading-relaxed font-sans">
                  {run.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
