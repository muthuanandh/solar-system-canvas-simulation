import React from 'react';
import { X, Sparkles, Keyboard, MousePointer, Info } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 id="guide-modal-title" className="text-lg font-bold text-white">
              Solar System Simulator Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close guide modal"
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs">
          
          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <MousePointer className="w-4 h-4 text-indigo-400" />
              Interactive Controls
            </h3>
            <ul className="space-y-1.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <li className="flex items-center justify-between">
                <span>Select a Planet</span>
                <span className="font-mono text-slate-400">Click on canvas or use top bar</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Orbital Speed Slider</span>
                <span className="font-mono text-slate-400">Adjust from 0.1x to 10.0x speed</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Scale / Zoom Slider</span>
                <span className="font-mono text-slate-400">Zoom in or out (40% - 300%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Toggle Views</span>
                <span className="font-mono text-slate-400">Show/Hide Orbits, Labels, Stars</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Keyboard className="w-4 h-4 text-emerald-400" />
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span>Play / Pause</span>
                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">Space</kbd>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span>Close Panel</span>
                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">Esc</kbd>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span>Reset Simulation</span>
                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">R</kbd>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span>Toggle Labels</span>
                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono border border-slate-700">L</kbd>
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-950/40 border border-indigo-900/50 rounded-xl text-indigo-200/90 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              This simulator is built using pure React, TypeScript, and HTML5 Canvas with 60 FPS animation for seamless performance on desktop and mobile devices.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-lg shadow-indigo-600/30"
          >
            Got it, start exploring!
          </button>
        </div>
      </div>
    </div>
  );
};
