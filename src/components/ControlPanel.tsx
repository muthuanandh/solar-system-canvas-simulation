import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  ZoomIn,
  ZoomOut,
  Tag,
  Circle,
} from 'lucide-react';
import { SimulationState } from '../types/planet';

interface ControlPanelProps {
  state: SimulationState;
  onTogglePlay: () => void;
  onSetSpeed: (speed: number) => void;
  onSetScale: (scale: number) => void;
  onToggleLabels: () => void;
  onToggleOrbits: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  state,
  onTogglePlay,
  onSetSpeed,
  onSetScale,
  onToggleLabels,
  onToggleOrbits,
  onReset,
}) => {
  return (
    <div className="relative z-20 w-full bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 px-4 py-3 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Playback & Reset Buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-center">
          <button
            onClick={onTogglePlay}
            aria-label={state.isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg ${
              state.isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/30'
            }`}
          >
            {state.isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-amber-300" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            aria-label="Reset Simulation to Defaults"
            title="Reset simulation parameters"
            className="px-3.5 py-2 rounded-xl text-sm font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block" />

          {/* Toggles */}
          <button
            onClick={onToggleLabels}
            aria-label={state.showLabels ? 'Hide Planet Labels' : 'Show Planet Labels'}
            className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              state.showLabels
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900/80 text-slate-500 border-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span className="hidden lg:inline">Labels</span>
          </button>

          <button
            onClick={onToggleOrbits}
            aria-label={state.showOrbits ? 'Hide Orbit Paths' : 'Show Orbit Paths'}
            className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              state.showOrbits
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900/80 text-slate-500 border-slate-800'
            }`}
          >
            <Circle className="w-4 h-4" />
            <span className="hidden lg:inline">Orbits</span>
          </button>
        </div>

        {/* Sliders Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto md:min-w-[420px]">
          
          {/* Orbital Speed Slider */}
          <div className="flex flex-col space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-indigo-400" />
                Orbital Speed
              </span>
              <span className="font-mono text-indigo-300 font-bold bg-indigo-950/80 px-2 py-0.5 rounded text-[11px] border border-indigo-800/50">
                {state.speed.toFixed(1)}x
              </span>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Slow</span>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.1"
                value={state.speed}
                onChange={(e) => onSetSpeed(parseFloat(e.target.value))}
                aria-label="Orbital Speed Slider"
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Fast</span>
            </div>
          </div>

          {/* Scale / Zoom Slider */}
          <div className="flex flex-col space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                Scale / Zoom
              </span>
              <span className="font-mono text-indigo-300 font-bold bg-indigo-950/80 px-2 py-0.5 rounded text-[11px] border border-indigo-800/50">
                {Math.round(state.scale * 100)}%
              </span>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <ZoomOut className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.05"
                value={state.scale}
                onChange={(e) => onSetScale(parseFloat(e.target.value))}
                aria-label="Scale Zoom Slider"
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <ZoomIn className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
