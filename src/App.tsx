import React, { useState, useEffect } from 'react';
import { useSolarSystem } from './hooks/useSolarSystem';
import { Header } from './components/Header';
import { PlanetQuickSelect } from './components/PlanetQuickSelect';
import { SolarSystemCanvas } from './components/SolarSystemCanvas';
import { ControlPanel } from './components/ControlPanel';
import { PlanetInfo } from './components/PlanetInfo';
import { GuideModal } from './components/GuideModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const {
    state,
    isInfoOpen,
    togglePlay,
    setSpeed,
    setScale,
    toggleLabels,
    toggleOrbits,
    toggleStars,
    selectPlanet,
    setHoveredPlanet,
    closeInfo,
    resetSimulation,
  } = useSolarSystem();

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if typing inside inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'Escape') {
        if (isHelpOpen) {
          setIsHelpOpen(false);
        } else if (isInfoOpen) {
          closeInfo();
        }
      } else if (e.key.toLowerCase() === 'r') {
        resetSimulation();
      } else if (e.key.toLowerCase() === 'l') {
        toggleLabels();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, isHelpOpen, isInfoOpen, closeInfo, resetSimulation, toggleLabels]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#050714] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation Header */}
      <Header
        state={state}
        onToggleStars={toggleStars}
        onToggleHelp={() => setIsHelpOpen(true)}
      />

      {/* Quick Select Bar */}
      <PlanetQuickSelect
        selectedId={state.selectedPlanetId}
        onSelect={selectPlanet}
      />

      {/* Canvas Area with Overlay Panels */}
      <main className="relative flex-1 w-full h-full overflow-hidden flex flex-col">
        <SolarSystemCanvas
          state={state}
          onSelectPlanet={selectPlanet}
          onHoverPlanet={setHoveredPlanet}
        />

        {/* Planet Detailed Information Drawer */}
        <PlanetInfo
          selectedId={state.selectedPlanetId}
          isOpen={isInfoOpen}
          onClose={closeInfo}
        />
      </main>

      {/* Control Panel Footer */}
      <ControlPanel
        state={state}
        onTogglePlay={togglePlay}
        onSetSpeed={setSpeed}
        onSetScale={setScale}
        onToggleLabels={toggleLabels}
        onToggleOrbits={toggleOrbits}
        onReset={resetSimulation}
      />

      {/* App Footer */}
      <Footer />

      {/* Interactive Guide Modal */}
      <GuideModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

    </div>
  );
};

export default App;
