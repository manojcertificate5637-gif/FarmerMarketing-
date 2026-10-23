import React, { useState } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';
import { PrototypeItem } from '../types/prototype';

interface CodeInspectorProps {
  prototype: PrototypeItem;
}

export default function CodeInspector({ prototype }: CodeInspectorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prototype.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([prototype.codeSnippet], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prototype.id}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 bg-slate-950 text-slate-100 overflow-y-auto max-w-5xl mx-auto space-y-6 select-text">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <span>Prototype Source Implementation</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            React TypeScript component architecture for {prototype.title}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export TSX</span>
          </button>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 font-mono text-xs">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between text-slate-400">
          <span>{prototype.id}.tsx</span>
          <span>TypeScript · React 19</span>
        </div>
        <pre className="p-5 text-slate-200 overflow-x-auto leading-relaxed">
          <code>{prototype.codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
}
