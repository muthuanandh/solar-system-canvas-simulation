import React from 'react';
import { X, Info, Globe, Ruler, Orbit, Sun, Moon, Thermometer } from 'lucide-react';
import { ALL_CELESTIAL_OBJECTS } from '../data/planets';

interface PlanetInfoProps {
  selectedId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlanetInfo: React.FC<PlanetInfoProps> = ({
  selectedId,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !selectedId) return null;

  const planet = ALL_CELESTIAL_OBJECTS.find((p) => p.id === selectedId);
  if (!planet) return null;

  return (
    <aside
      className="fixed md:absolute top-16 right-4 bottom-24 z-30 w-full max-w-sm sm:max-w-md bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto flex flex-col transition-all animate-in slide-in-from-right duration-300"
      aria-label={`${planet.name} Information Panel`}
      role="region"
    >
      {/* Visual Header with Gradient */}
      <div className="relative p-5 border-b border-slate-800/80 overflow-hidden">
        {/* Glow backdrop */}
        <div
          className="absolute -right-10 -top-10 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: planet.color }}
        />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 shrink-0"
              style={{
                background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${planet.color} 60%, ${planet.secondaryColor || '#000000'} 100%)`,
              }}
            />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {planet.name}
              </h2>
              <span className="inline-block mt-0.5 text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-900 text-indigo-300 border border-indigo-500/30">
                {planet.type}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close planet info panel"
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 space-y-5 flex-1">
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Distance from Sun
            </span>
            <span className="text-sm font-bold text-slate-100 mt-1">
              {planet.realDistanceAU > 0 ? `${planet.realDistanceAU} AU` : '0 AU'}
            </span>
            <span className="text-[10px] text-slate-500">
              ({planet.realDistanceKm})
            </span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Orbit className="w-3.5 h-3.5 text-indigo-400" />
              Orbital Period
            </span>
            <span className="text-sm font-bold text-slate-100 mt-1">
              {planet.orbitalPeriod}
            </span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Ruler className="w-3.5 h-3.5 text-emerald-400" />
              Diameter
            </span>
            <span className="text-sm font-bold text-slate-100 mt-1">
              {planet.diameterKm}
            </span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-slate-300" />
              Moons
            </span>
            <span className="text-sm font-bold text-slate-100 mt-1">
              {planet.moonsCount} {planet.moonsCount === 1 ? 'Moon' : 'Moons'}
            </span>
          </div>

        </div>

        {/* Temperature Badge */}
        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <Thermometer className="w-4 h-4 text-rose-400" />
            Surface Temperature
          </span>
          <span className="font-semibold text-slate-200">
            {planet.surfaceTemp}
          </span>
        </div>

        {/* Educational Description */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            Overview
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
            {planet.description}
          </p>
        </div>

        {/* Fun Facts */}
        {planet.funFacts && planet.funFacts.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              Educational Facts
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {planet.funFacts.map((fact, index) => (
                <li
                  key={index}
                  className="bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-900/40 flex items-start gap-2"
                >
                  <span className="text-indigo-400 font-bold text-sm leading-none">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Educational Scaling Disclaimer */}
        <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-[11px] text-amber-200/90 leading-normal flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Note:</strong> Planet sizes and orbital distances in this simulation are scaled for clear visualization on computer screens and are not scientifically proportional.
          </span>
        </div>

      </div>
    </aside>
  );
};
