import React, { useState } from 'react';
import { X, Sparkles, Link, Code, RefreshCw, AlertCircle } from 'lucide-react';
import { PrototypeItem } from '../types/prototype';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (newPrototype: PrototypeItem) => void;
  initialUrl?: string;
}

export default function ImportModal({
  isOpen,
  onClose,
  onImportComplete,
  initialUrl = 'https://ai.studio/apps/45f83cac-65ec-4558-b4c2-a119b58fba26?fullscreenApplet=true'
}: ImportModalProps) {
  const [importType, setImportType] = useState<'url' | 'code'>('url');
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [codeInput, setCodeInput] = useState('');
  const [prototypeTitle, setPrototypeTitle] = useState('Imported Applet Prototype');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-prototype', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urlOrId: importType === 'url' ? urlInput : undefined,
          prototypeCode: importType === 'code' ? codeInput : undefined,
          prototypeType: prototypeTitle,
          analysisMode: 'Comprehensive Audit'
        })
      });

      const json = await response.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || 'Failed to complete prototype analysis');
      }

      const analysisData = json.data;

      const newProto: PrototypeItem = {
        id: `imported-${Date.now()}`,
        title: analysisData.title || prototypeTitle,
        subtitle: 'User Imported Prototype Spec',
        category: 'Custom Prototype',
        urlOrRef: importType === 'url' ? urlInput : undefined,
        defaultDevice: 'desktop',
        codeSnippet: codeInput || `// Prototype reference: ${urlInput}\n// Loaded via Prototype Inspector\nexport default function ImportedPrototype() {\n  return <div>Interactive Prototype</div>;\n}`,
        analysis: analysisData
      };

      onImportComplete(newProto);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error importing prototype');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-text">
      <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Import & Analyze Prototype</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Segmented Mode Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setImportType('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors ${
                importType === 'url' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Link className="w-3.5 h-3.5" />
              <span>AI Studio Applet URL / UUID</span>
            </button>
            <button
              onClick={() => setImportType('code')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors ${
                importType === 'code' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Paste Code or Spec</span>
            </button>
          </div>

          {importType === 'url' ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  AI Studio Applet URL or Identifier
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  placeholder="https://ai.studio/apps/..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Google AI Studio Session Note</span>
                </div>
                <p className="leading-relaxed">
                  Applet URLs formatted as <code className="text-slate-300 font-mono">ai.studio/apps/&lt;uuid&gt;</code> require private Google Account authentication. Our analyzer parses the prototype structure, builds a live interactive instance, and provides full architectural auditing.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Prototype Component / Spec
                </label>
                <textarea
                  rows={6}
                  value={codeInput}
                  onChange={e => setCodeInput(e.target.value)}
                  placeholder="Paste your React component or design specification here..."
                  className="w-full p-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-900/50 rounded-lg text-xs text-rose-300">
              {error}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/40">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Audit...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze & Mount</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
