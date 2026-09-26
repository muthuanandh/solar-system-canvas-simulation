import React from 'react';
import { ALL_CELESTIAL_OBJECTS } from '../data/planets';

interface PlanetQuickSelectProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const PlanetQuickSelect: React.FC<PlanetQuickSelectProps> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <div className="relative z-10 w-full bg-slate-950/70 border-b border-slate-800/60 py-2 px-4 overflow-x-auto scrollbar-thin">
      <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center space-x-2 min-w-max">
        <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mr-2 shrink-0">
          Target Planet:
        </span>

        {ALL_CELESTIAL_OBJECTS.map((obj) => {
          const isSelected = selectedId === obj.id;
          return (
            <button
              key={obj.id}
              onClick={() => onSelect(isSelected ? null : obj.id)}
              aria-label={`Select ${obj.name}`}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shadow-inner"
                style={{ backgroundColor: obj.color }}
              />
              <span>{obj.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
