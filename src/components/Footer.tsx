import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full py-2 px-4 bg-slate-950 border-t border-slate-900 text-center text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center space-x-2">
        <span>Solar System Canvas Simulation</span>
        <span>•</span>
        <span className="text-slate-400 font-mono">React 18 + TS + Vite</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[10px] font-medium border border-emerald-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Production Ready Frontend
        </span>
        <span>Educational Demo</span>
      </div>
    </footer>
  );
};
