import React from 'react';
import {
  Sparkles,
  Maximize,
  Minimize,
  Eye,
  EyeOff,
  HelpCircle,
} from 'lucide-react';
import { SimulationState } from '../types/planet';

interface HeaderProps {
  state: SimulationState;
  onToggleStars: () => void;
  onToggleHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onToggleStars,
  onToggleHelp,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  React.useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  return (
    <header className="relative z-20 w-full px-4 py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-white flex items-center gap-2">
            Solar System Canvas Simulation
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
              HTML5 Canvas
            </span>
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            Interactive planetary orbital mechanics & scale visualization
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleStars}
          title={state.showStars ? 'Hide Starfield' : 'Show Starfield'}
          aria-label={state.showStars ? 'Hide Background Stars' : 'Show Background Stars'}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${
            state.showStars
              ? 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
              : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:bg-slate-800'
          }`}
        >
          {state.showStars ? (
            <>
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Stars On</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Stars Off</span>
            </>
          )}
        </button>

        <button
          onClick={onToggleHelp}
          title="User Guide & Controls"
          aria-label="User Guide & Controls"
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Guide</span>
        </button>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          className="p-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
