import React, { useEffect, useRef, useCallback } from 'react';
import { SimulationState } from '../types/planet';
import { SUN_DATA, PLANETS_DATA } from '../data/planets';

interface SolarSystemCanvasProps {
  state: SimulationState;
  onSelectPlanet: (id: string | null) => void;
  onHoverPlanet: (id: string | null) => void;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
}

export const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({
  state,
  onSelectPlanet,
  onHoverPlanet,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store planet angles in a ref to prevent frame re-render loops
  const anglesRef = useRef<{ [id: string]: number }>({
    mercury: Math.PI * 0.2,
    venus: Math.PI * 0.7,
    earth: Math.PI * 1.2,
    mars: Math.PI * 1.8,
    jupiter: Math.PI * 0.5,
    saturn: Math.PI * 1.4,
    uranus: Math.PI * 0.9,
    neptune: Math.PI * 0.3,
  });

  // Store calculated positions for hit testing
  const positionsRef = useRef<{ [id: string]: { x: number; y: number; radius: number } }>({});
  
  // Ref for starfield background
  const starsRef = useRef<Star[]>([]);

  // Animation frame ID ref
  const animFrameIdRef = useRef<number | null>(null);

  // Keep state accessible inside RAF without re-binding loop
  const stateRef = useRef(state);
  stateRef.current = state;

  // Initialize starfield
  useEffect(() => {
    const starCount = 250;
    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: (Math.random() - 0.5) * 0.015,
      });
    }
    starsRef.current = newStars;
  }, []);

  // Rendering loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const {
      isPlaying,
      speed,
      scale,
      showLabels,
      showOrbits,
      showStars,
      selectedPlanetId,
      hoveredPlanetId,
    } = stateRef.current;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Clear background
    ctx.clearRect(0, 0, width, height);

    // Deep space gradient backdrop
    const bgGrad = ctx.createRadialGradient(
      centerX,
      centerY,
      50,
      centerX,
      centerY,
      Math.max(width, height) * 0.8
    );
    bgGrad.addColorStop(0, '#0a0d24');
    bgGrad.addColorStop(0.6, '#050714');
    bgGrad.addColorStop(1, '#02030a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Render Starfield
    if (showStars) {
      starsRef.current.forEach((star) => {
        // Twinkle effect
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        const sx = star.x * width;
        const sy = star.y * height;

        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.fill();
      });
    }

    // Update positions store
    const currentPositions: { [id: string]: { x: number; y: number; radius: number } } = {};

    // 3. Render Orbits
    PLANETS_DATA.forEach((planet) => {
      const orbitR = planet.orbitDistance * scale;
      const isSelected = selectedPlanetId === planet.id;
      const isHovered = hoveredPlanetId === planet.id;

      if (showOrbits || isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitR, 0, Math.PI * 2);
        
        if (isSelected) {
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
        } else if (isHovered) {
          ctx.strokeStyle = 'rgba(165, 180, 252, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // 4. Render Sun
    const sunRadius = SUN_DATA.radius * Math.min(scale, 1.3);
    currentPositions['sun'] = { x: centerX, y: centerY, radius: sunRadius };

    // Sun outer corona / glow
    const sunCoronaGrad = ctx.createRadialGradient(
      centerX,
      centerY,
      sunRadius * 0.4,
      centerX,
      centerY,
      sunRadius * 2.8
    );
    sunCoronaGrad.addColorStop(0, 'rgba(253, 184, 19, 0.8)');
    sunCoronaGrad.addColorStop(0.3, 'rgba(255, 111, 0, 0.4)');
    sunCoronaGrad.addColorStop(0.7, 'rgba(255, 111, 0, 0.12)');
    sunCoronaGrad.addColorStop(1, 'rgba(255, 111, 0, 0)');

    ctx.beginPath();
    ctx.arc(centerX, centerY, sunRadius * 2.8, 0, Math.PI * 2);
    ctx.fillStyle = sunCoronaGrad;
    ctx.fill();

    // Sun body
    const sunBodyGrad = ctx.createRadialGradient(
      centerX - sunRadius * 0.2,
      centerY - sunRadius * 0.2,
      0,
      centerX,
      centerY,
      sunRadius
    );
    sunBodyGrad.addColorStop(0, '#FFFFFF');
    sunBodyGrad.addColorStop(0.2, '#FFF176');
    sunBodyGrad.addColorStop(0.7, '#FDB813');
    sunBodyGrad.addColorStop(1, '#E65100');

    ctx.beginPath();
    ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = sunBodyGrad;
    ctx.fill();

    // Highlight around Sun if selected
    if (selectedPlanetId === 'sun' || hoveredPlanetId === 'sun') {
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius + 6, 0, Math.PI * 2);
      ctx.strokeStyle = selectedPlanetId === 'sun' ? '#FDB813' : 'rgba(253, 184, 19, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 5. Render Planets
    PLANETS_DATA.forEach((planet) => {
      // Update angle if playing
      if (isPlaying) {
        anglesRef.current[planet.id] =
          (anglesRef.current[planet.id] + planet.baseSpeed * speed * 0.05) % (Math.PI * 2);
      }

      const angle = anglesRef.current[planet.id];
      const orbitR = planet.orbitDistance * scale;
      const px = centerX + Math.cos(angle) * orbitR;
      const py = centerY + Math.sin(angle) * orbitR;
      const renderRadius = Math.max(3, planet.radius * Math.min(scale, 1.5));

      currentPositions[planet.id] = { x: px, y: py, radius: renderRadius };

      const isSelected = selectedPlanetId === planet.id;
      const isHovered = hoveredPlanetId === planet.id;

      // Focal ray line from Sun if selected
      if (isSelected) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Planet atmosphere glow
      if (planet.atmosphereColor) {
        const atmoGrad = ctx.createRadialGradient(
          px,
          py,
          renderRadius * 0.5,
          px,
          py,
          renderRadius * 2.2
        );
        atmoGrad.addColorStop(0, planet.atmosphereColor);
        atmoGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(px, py, renderRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = atmoGrad;
        ctx.fill();
      }

      // Saturn Rings (drawn behind planet upper hemisphere or centered tilt)
      if (planet.hasRings && planet.ringInnerRadius && planet.ringOuterRadius) {
        const ringInner = planet.ringInnerRadius * Math.min(scale, 1.5);
        const ringOuter = planet.ringOuterRadius * Math.min(scale, 1.5);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 6); // 30 degree tilt

        ctx.beginPath();
        ctx.ellipse(0, 0, ringOuter, ringOuter * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = planet.ringColor || 'rgba(226, 193, 117, 0.6)';
        ctx.lineWidth = ringOuter - ringInner;
        ctx.stroke();
        ctx.restore();
      }

      // Planet body gradient
      const bodyGrad = ctx.createRadialGradient(
        px - renderRadius * 0.3,
        py - renderRadius * 0.3,
        0,
        px,
        py,
        renderRadius
      );
      bodyGrad.addColorStop(0, '#FFFFFF');
      bodyGrad.addColorStop(0.3, planet.color);
      bodyGrad.addColorStop(1, planet.secondaryColor || '#111827');

      ctx.beginPath();
      ctx.arc(px, py, renderRadius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Earth's Moon
      if (planet.id === 'earth') {
        const moonAngle = (angle * 8) % (Math.PI * 2);
        const moonDistance = renderRadius + 10 * Math.min(scale, 1.2);
        const mx = px + Math.cos(moonAngle) * moonDistance;
        const my = py + Math.sin(moonAngle) * moonDistance;

        // Draw moon orbit
        ctx.beginPath();
        ctx.arc(px, py, moonDistance, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw moon body
        ctx.beginPath();
        ctx.arc(mx, my, Math.max(1.5, 2.5 * scale), 0, Math.PI * 2);
        ctx.fillStyle = '#E2E8F0';
        ctx.fill();
      }

      // Selection ring target highlight
      if (isSelected || isHovered) {
        const targetRadius = renderRadius + 8;
        ctx.beginPath();
        ctx.arc(px, py, targetRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? '#818CF8' : 'rgba(199, 210, 254, 0.6)';
        ctx.lineWidth = isSelected ? 2 : 1.5;
        if (isSelected) {
          ctx.setLineDash([4, 4]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 6. Labels
      if (showLabels || isSelected || isHovered) {
        ctx.font = isSelected
          ? 'bold 12px Inter, sans-serif'
          : '500 11px Inter, sans-serif';
        const labelText = planet.name;
        const textWidth = ctx.measureText(labelText).width;
        const labelY = py + renderRadius + 14;

        // Background pill
        ctx.fillStyle = isSelected
          ? 'rgba(79, 70, 229, 0.85)'
          : isHovered
          ? 'rgba(30, 41, 59, 0.85)'
          : 'rgba(15, 23, 42, 0.6)';
        
        ctx.beginPath();
        ctx.roundRect(
          px - textWidth / 2 - 6,
          labelY - 11,
          textWidth + 12,
          16,
          8
        );
        ctx.fill();

        // Label text
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#CBD5E1';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, px, labelY - 2);
      }
    });

    // Sun Label
    if (showLabels || selectedPlanetId === 'sun' || hoveredPlanetId === 'sun') {
      const sunLabelY = centerY + sunRadius + 14;
      ctx.font = selectedPlanetId === 'sun' ? 'bold 12px Inter, sans-serif' : '500 11px Inter, sans-serif';
      const textWidth = ctx.measureText('Sun').width;
      
      ctx.fillStyle = selectedPlanetId === 'sun'
        ? 'rgba(217, 119, 6, 0.9)'
        : 'rgba(15, 23, 42, 0.6)';
      
      ctx.beginPath();
      ctx.roundRect(centerX - textWidth / 2 - 6, sunLabelY - 11, textWidth + 12, 16, 8);
      ctx.fill();

      ctx.fillStyle = '#FDE68A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Sun', centerX, sunLabelY - 2);
    }

    positionsRef.current = currentPositions;

    // Schedule next frame
    animFrameIdRef.current = requestAnimationFrame(render);
  }, []);

  // Dynamic canvas resize handler
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Start animation loop
  useEffect(() => {
    animFrameIdRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [render]);

  // Mouse move handler for hover detection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let foundId: string | null = null;

    // Check collision with any celestial object
    Object.entries(positionsRef.current).forEach(([id, pos]) => {
      const hitRadius = Math.max(pos.radius + 8, 14);
      const dist = Math.hypot(mx - pos.x, my - pos.y);
      if (dist <= hitRadius) {
        foundId = id;
      }
    });

    onHoverPlanet(foundId);
  };

  // Mouse click handler
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let foundId: string | null = null;

    Object.entries(positionsRef.current).forEach(([id, pos]) => {
      const hitRadius = Math.max(pos.radius + 10, 16);
      const dist = Math.hypot(mx - pos.x, my - pos.y);
      if (dist <= hitRadius) {
        foundId = id;
      }
    });

    onSelectPlanet(foundId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex-1 overflow-hidden bg-[#050714] cursor-default select-none"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`w-full h-full block ${
          state.hoveredPlanetId ? 'cursor-pointer' : 'cursor-default'
        }`}
        aria-label="Solar System 2D Interactive Canvas Visualization"
        role="img"
      />
    </div>
  );
};
