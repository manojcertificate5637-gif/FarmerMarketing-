import React from 'react';
import { DeviceMode, PrototypeItem } from '../types/prototype';
import AIStudioAppletPrototype from './prototypes/AIStudioAppletPrototype';
import CloudOpsPrototype from './prototypes/CloudOpsPrototype';
import DesignSystemPrototype from './prototypes/DesignSystemPrototype';

interface LivePrototypeViewerProps {
  device: DeviceMode;
  zoom: number;
  currentPrototype: PrototypeItem;
  isFullscreen: boolean;
}

export default function LivePrototypeViewer({
  device,
  zoom,
  currentPrototype,
  isFullscreen
}: LivePrototypeViewerProps) {
  const getContainerWidth = () => {
    switch (device) {
      case 'desktop':
        return 'w-full max-w-[1440px]';
      case 'tablet':
        return 'w-[768px]';
      case 'mobile':
        return 'w-[375px]';
    }
  };

  const getContainerHeight = () => {
    switch (device) {
      case 'desktop':
        return 'h-full min-h-[640px]';
      case 'tablet':
        return 'h-[1024px]';
      case 'mobile':
        return 'h-[812px]';
    }
  };

  const renderActivePrototype = () => {
    switch (currentPrototype.id) {
      case 'ai-studio-45f83cac':
        return <AIStudioAppletPrototype />;
      case 'cloud-ops-dashboard':
        return <CloudOpsPrototype />;
      case 'design-system-sandbox':
        return <DesignSystemPrototype />;
      default:
        return <AIStudioAppletPrototype />;
    }
  };

  return (
    <div className={`flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-950/80 overflow-auto ${
      isFullscreen ? 'fixed inset-0 z-50 p-0' : ''
    }`}>
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out'
        }}
        className={`transition-all duration-200 ${getContainerWidth()} ${getContainerHeight()} flex flex-col`}
      >
        {/* Device Frame Wrapper (Subtle hairline border and single-elevation) */}
        <div className={`flex-1 flex flex-col bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden ${
          device === 'mobile' ? 'rounded-[32px] ring-8 ring-slate-900/80' :
          device === 'tablet' ? 'rounded-2xl ring-8 ring-slate-900/60' :
          'rounded-xl'
        }`}>
          {/* Hardware notch / speaker simulation for mobile preview */}
          {device === 'mobile' && (
            <div className="h-6 bg-slate-950 flex items-center justify-center shrink-0 border-b border-slate-900">
              <div className="w-20 h-3 bg-slate-900 rounded-full" />
            </div>
          )}

          {/* Active Prototype Component */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {renderActivePrototype()}
          </div>
        </div>
      </div>
    </div>
  );
}
