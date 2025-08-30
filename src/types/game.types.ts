export interface GameState {
  level: number;
  score: number;
  missedVegetables: number;
  capybaraFillPercentage: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'paused';
  fallSpeed: number;
  ceilingHeight: number;
}

export interface Vegetable {
  id: string;
  type: 'carrot' | 'broccoli' | 'lettuce' | 'tomato' | 'pepper';
  x: number;
  y: number;
  speed: number;
  points: number;
}

export interface CapybaraPlayer {
  x: number;
  y: number;
  width: number;
  height: number;
  fillPercentage: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}