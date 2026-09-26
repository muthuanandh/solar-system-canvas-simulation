import { useState, useCallback } from 'react';
import { SimulationState } from '../types/planet';

export function useSolarSystem() {
  const [state, setState] = useState<SimulationState>({
    isPlaying: true,
    speed: 1.0,
    scale: 1.0,
    showLabels: true,
    showOrbits: true,
    showStars: true,
    selectedPlanetId: null,
    hoveredPlanetId: null,
  });

  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const togglePlay = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    // Clamp speed between 0.1 and 10.0
    const clampedSpeed = Math.max(0.1, Math.min(10.0, Number(newSpeed.toFixed(1))));
    setState((prev) => ({ ...prev, speed: clampedSpeed }));
  }, []);

  const setScale = useCallback((newScale: number) => {
    // Clamp scale between 0.4 and 3.0
    const clampedScale = Math.max(0.4, Math.min(3.0, Number(newScale.toFixed(2))));
    setState((prev) => ({ ...prev, scale: clampedScale }));
  }, []);

  const toggleLabels = useCallback(() => {
    setState((prev) => ({ ...prev, showLabels: !prev.showLabels }));
  }, []);

  const toggleOrbits = useCallback(() => {
    setState((prev) => ({ ...prev, showOrbits: !prev.showOrbits }));
  }, []);

  const toggleStars = useCallback(() => {
    setState((prev) => ({ ...prev, showStars: !prev.showStars }));
  }, []);

  const selectPlanet = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedPlanetId: id }));
    if (id) {
      setIsInfoOpen(true);
    } else {
      setIsInfoOpen(false);
    }
  }, []);

  const setHoveredPlanet = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, hoveredPlanetId: id }));
  }, []);

  const closeInfo = useCallback(() => {
    setIsInfoOpen(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setState({
      isPlaying: true,
      speed: 1.0,
      scale: 1.0,
      showLabels: true,
      showOrbits: true,
      showStars: true,
      selectedPlanetId: null,
      hoveredPlanetId: null,
    });
    setIsInfoOpen(false);
  }, []);

  return {
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
  };
}
