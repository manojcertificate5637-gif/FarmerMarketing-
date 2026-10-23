import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { DeviceMode, PrototypeItem } from '../types/prototype';

interface ViewportControlsProps {
  device: DeviceMode;
  setDevice: (d: DeviceMode) => void;
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  prototypes: PrototypeItem[];
  currentPrototype: PrototypeItem;
  onSelectPrototype: (p: PrototypeItem) => void;
  onResetView: () => void;
  isFullscreen: boolean;
  setIsFullscreen: (f: boolean | ((prev: boolean) => boolean)) => void;
}

export default function ViewportControls({
  device,
  setDevice,
  zoom,
  setZoom,
  prototypes,
  currentPrototype,
  onSelectPrototype,
  onResetView,
  isFullscreen,
  setIsFullscreen
}: ViewportControlsProps) {
  const deviceDimensions = {
    desktop: '1440 × 900 px',
    tablet: '768 × 1024 px',
    mobile: '375 × 812 px'
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-b border-slate-800 bg-slate-900/40 text-xs shrink-0">
      {/* Left: Active Prototype Selector */}
      <div className="flex items-center gap-3">
        <span className="text-slate-400 font-medium">Active Prototype:</span>
        <select
          value={currentPrototype.id}
          onChange={(e) => {
            const found = prototypes.find(p => p.id === e.target.value);
            if (found) onSelectPrototype(found);
          }}
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium cursor-pointer"
        >
          {prototypes.map(p => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <span className="hidden lg:inline text-slate-500">·</span>
        <span className="hidden lg:inline text-slate-400 font-mono tabular-nums">
          {deviceDimensions[device]}
        </span>
      </div>

      {/* Center: Device Viewport Segmented Control (Interactive Filter Buttons) */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
        <button
          onClick={() => setDevice('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            device === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
          title="Desktop 1440px baseline"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Desktop</span>
        </button>
        <button
          onClick={() => setDevice('tablet')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            device === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
          title="Tablet 768px"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tablet</span>
        </button>
        <button
          onClick={() => setDevice('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            device === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
          title="Mobile 375px"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mobile</span>
        </button>
      </div>

      {/* Right: Zoom & Utility Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setZoom(z => Math.max(0.6, z - 0.1))}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 text-[11px] font-mono text-slate-300 tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onResetView}
          className="p-1.5 text-slate-400 hover:text-white border border-slate-800 bg-slate-900 rounded-lg transition-colors"
          title="Reset zoom & frame"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsFullscreen(f => !f)}
          className={`p-1.5 border border-slate-800 rounded-lg transition-colors ${
            isFullscreen ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
