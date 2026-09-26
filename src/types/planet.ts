export type PlanetType = 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant';

export interface PlanetData {
  id: string;
  name: string;
  type: PlanetType;
  radius: number; // Base visual radius in pixels
  orbitDistance: number; // Base orbital radius in pixels
  baseSpeed: number; // Base angular speed (radians per frame at 1x)
  color: string; // Primary hex/color string
  secondaryColor?: string;
  atmosphereColor?: string;
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringColor?: string;
  
  // Real world & educational metadata
  realDistanceAU: number;
  realDistanceKm: string;
  diameterKm: string;
  orbitalPeriod: string;
  moonsCount: number;
  surfaceTemp: string;
  description: string;
  funFacts: string[];
}

export interface SimulationState {
  isPlaying: boolean;
  speed: number;
  scale: number;
  showLabels: boolean;
  showOrbits: boolean;
  showStars: boolean;
  selectedPlanetId: string | null;
  hoveredPlanetId: string | null;
}
