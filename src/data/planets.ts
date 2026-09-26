import { PlanetData } from '../types/planet';

export const SUN_DATA: PlanetData = {
  id: 'sun',
  name: 'Sun',
  type: 'Star',
  radius: 34,
  orbitDistance: 0,
  baseSpeed: 0,
  color: '#FDB813',
  secondaryColor: '#FF6F00',
  atmosphereColor: 'rgba(255, 184, 19, 0.35)',
  realDistanceAU: 0,
  realDistanceKm: '0 km',
  diameterKm: '1,392,700 km',
  orbitalPeriod: 'Center of Solar System',
  moonsCount: 0,
  surfaceTemp: '5,500 °C (Core: 15,000,000 °C)',
  description: 'The Sun is the yellow dwarf star at the center of our Solar System. Its gravity holds the solar system together, keeping everything—from the biggest planets to the smallest debris—in orbit.',
  funFacts: [
    'Contains 99.86% of all mass in the Solar System.',
    'About 1.3 million Earths could fit inside the Sun.',
    'Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth.'
  ]
};

export const PLANETS_DATA: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'Terrestrial Planet',
    radius: 6,
    orbitDistance: 70,
    baseSpeed: 0.032,
    color: '#A5A5A5',
    secondaryColor: '#707070',
    atmosphereColor: 'rgba(165, 165, 165, 0.2)',
    realDistanceAU: 0.39,
    realDistanceKm: '57.9 million km',
    diameterKm: '4,879 km',
    orbitalPeriod: '88 Earth days',
    moonsCount: 0,
    surfaceTemp: '-180°C to 430°C',
    description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It experiences extreme temperature fluctuations because it has almost no atmosphere to retain heat.',
    funFacts: [
      'Fastest planet in the solar system, traveling at about 47 km/s.',
      'Despite being closest to the Sun, Venus is actually hotter than Mercury.',
      'A year on Mercury is 88 days, but a single day-night cycle lasts 176 Earth days.'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'Terrestrial Planet',
    radius: 9.5,
    orbitDistance: 110,
    baseSpeed: 0.022,
    color: '#E3BB76',
    secondaryColor: '#C49746',
    atmosphereColor: 'rgba(227, 187, 118, 0.3)',
    realDistanceAU: 0.72,
    realDistanceKm: '108.2 million km',
    diameterKm: '12,104 km',
    orbitalPeriod: '225 Earth days',
    moonsCount: 0,
    surfaceTemp: '465 °C',
    description: 'Venus is often called Earth’s twin because of their similar size and structure. However, Venus has a runaway greenhouse effect making it the hottest planet in the solar system.',
    funFacts: [
      'Rotates in the opposite direction (retrograde) compared to most other planets.',
      'A day on Venus (243 Earth days) is longer than its year (225 Earth days).',
      'Atmospheric pressure at its surface is 92 times greater than Earth’s.'
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'Terrestrial Planet',
    radius: 10.5,
    orbitDistance: 155,
    baseSpeed: 0.016,
    color: '#4F92FF',
    secondaryColor: '#2B65D9',
    atmosphereColor: 'rgba(79, 146, 255, 0.35)',
    realDistanceAU: 1.0,
    realDistanceKm: '149.6 million km',
    diameterKm: '12,742 km',
    orbitalPeriod: '365.25 Earth days',
    moonsCount: 1,
    surfaceTemp: '-89°C to 58°C (Avg: 15°C)',
    description: 'Earth is our home planet and the only world known so far to harbor life. It is the third planet from the Sun and the only world with liquid water on its surface.',
    funFacts: [
      '71% of Earth’s surface is covered by oceans.',
      'Protected from cosmic radiation by a powerful magnetosphere produced by its nickel-iron core.',
      'Earth is the densest major planet in the Solar System.'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'Terrestrial Planet',
    radius: 7.5,
    orbitDistance: 205,
    baseSpeed: 0.012,
    color: '#E25B38',
    secondaryColor: '#B83A1B',
    atmosphereColor: 'rgba(226, 91, 56, 0.25)',
    realDistanceAU: 1.52,
    realDistanceKm: '227.9 million km',
    diameterKm: '6,779 km',
    orbitalPeriod: '687 Earth days',
    moonsCount: 2,
    surfaceTemp: '-125°C to 20°C (Avg: -60°C)',
    description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. It is known as the Red Planet due to iron oxide (rust) widespread on its surface.',
    funFacts: [
      'Home to Olympus Mons, the largest volcano in the solar system (3x taller than Mt. Everest).',
      'Has two small, irregular moons named Phobos and Deimos.',
      'Multiple robotic rovers are currently exploring Mars to search for signs of ancient life.'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'Gas Giant',
    radius: 22,
    orbitDistance: 275,
    baseSpeed: 0.0075,
    color: '#C88B3A',
    secondaryColor: '#A0641E',
    atmosphereColor: 'rgba(200, 139, 58, 0.3)',
    realDistanceAU: 5.20,
    realDistanceKm: '778.5 million km',
    diameterKm: '139,820 km',
    orbitalPeriod: '11.86 Earth years',
    moonsCount: 95,
    surfaceTemp: '-110 °C',
    description: 'Jupiter is by far the largest planet in our solar system—more than twice as massive as all the other planets combined. Its iconic Great Red Spot is a giant storm larger than Earth.',
    funFacts: [
      'Has the shortest day of any planet in the solar system, completing one rotation in under 10 hours.',
      'The Great Red Spot storm has been raging for at least 300 years.',
      'Its moon Ganymede is the largest moon in the solar system, bigger than Mercury.'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'Gas Giant',
    radius: 17.5,
    orbitDistance: 350,
    baseSpeed: 0.005,
    color: '#E2C175',
    secondaryColor: '#BBA053',
    atmosphereColor: 'rgba(226, 193, 117, 0.25)',
    hasRings: true,
    ringInnerRadius: 22,
    ringOuterRadius: 36,
    ringColor: 'rgba(226, 193, 117, 0.65)',
    realDistanceAU: 9.58,
    realDistanceKm: '1.43 billion km',
    diameterKm: '116,460 km',
    orbitalPeriod: '29.45 Earth years',
    moonsCount: 146,
    surfaceTemp: '-140 °C',
    description: 'Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. Made mostly of hydrogen and helium, it is the least dense planet—it could float in water!',
    funFacts: [
      'Saturn’s rings are mostly made of chunks of ice and carbonaceous dust.',
      'It has 146 confirmed moons, the most of any planet in our solar system.',
      'Its largest moon, Titan, has a dense atmosphere and liquid methane lakes.'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'Ice Giant',
    radius: 14,
    orbitDistance: 420,
    baseSpeed: 0.0035,
    color: '#64C5D3',
    secondaryColor: '#3895A3',
    atmosphereColor: 'rgba(100, 197, 211, 0.3)',
    realDistanceAU: 19.22,
    realDistanceKm: '2.87 billion km',
    diameterKm: '50,724 km',
    orbitalPeriod: '84 Earth years',
    moonsCount: 28,
    surfaceTemp: '-195 °C',
    description: 'Uranus is an ice giant with a blue-green hue caused by methane gas in its upper atmosphere. It rotates at a nearly 98-degree angle, essentially orbiting the Sun on its side.',
    funFacts: [
      'Rotates sideways with an axial tilt of 97.8 degrees, leading to 42-year long seasons.',
      'First planet discovered with the aid of a telescope (by William Herschel in 1781).',
      'Features 13 faint concentric rings.'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'Ice Giant',
    radius: 13.5,
    orbitDistance: 480,
    baseSpeed: 0.0024,
    color: '#3E64FF',
    secondaryColor: '#1A39B8',
    atmosphereColor: 'rgba(62, 100, 255, 0.35)',
    realDistanceAU: 30.05,
    realDistanceKm: '4.50 billion km',
    diameterKm: '49,244 km',
    orbitalPeriod: '164.8 Earth years',
    moonsCount: 16,
    surfaceTemp: '-200 °C',
    description: 'Dark, cold, and whipped by supersonic winds, ice giant Neptune is the most distant major planet in our solar system. It is more than 30 times as far from the Sun as Earth.',
    funFacts: [
      'Has the strongest winds recorded in the solar system, reaching up to 2,100 km/h.',
      'Was mathematically predicted before it was visually observed in 1846.',
      'Its giant moon Triton orbits backwards relative to the planet’s rotation.'
    ]
  }
];

export const ALL_CELESTIAL_OBJECTS: PlanetData[] = [SUN_DATA, ...PLANETS_DATA];
