import { createStore } from 'zustand/vanilla';
import { GameSettings } from '../config/GameSettings';

export interface GameState {
  // Global game state (UI-relevant)
  level: number;
  score: number;
  missedVegetables: number;
  capybaraFillPercentage: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'paused';
  
  // Game settings (not runtime objects)
  ceilingHeight: number;
  
  // Actions (only for global state)
  incrementLevel: () => void;
  incrementMissed: () => void;
  updateScore: (points: number) => void;
  resetForNextLevel: () => void;
  resetGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
}

export const useGameStore = createStore<GameState>()((set) => ({
  // Initial state
  level: 1,
  score: 0,
  missedVegetables: 0,
  capybaraFillPercentage: 0,
  gameStatus: 'playing',
  ceilingHeight: 100,

  // Actions
  incrementLevel: () =>
    set((state) => ({
      level: state.level + 1,
      ceilingHeight: Math.max(50, state.ceilingHeight * 0.9),
    })),

  incrementMissed: () =>
    set((state) => {
      const newMissed = state.missedVegetables + 1;
      return {
        missedVegetables: newMissed,
        gameStatus: newMissed >= 3 ? 'lost' : state.gameStatus,
      };
    }),

  updateScore: (points: number) =>
    set((state) => {
      const newScore = state.score + points;
      const newFillPoints = state.capybaraFillPercentage + points;
      const shouldLevelUp = newFillPoints >= GameSettings.LEVEL_UP_THRESHOLD;
      
      return {
        score: newScore,
        capybaraFillPercentage: shouldLevelUp ? GameSettings.LEVEL_UP_THRESHOLD : newFillPoints,
        gameStatus: shouldLevelUp ? 'won' : state.gameStatus,
      };
    }),

  resetForNextLevel: () =>
    set(() => ({
      capybaraFillPercentage: 0,
      missedVegetables: 0,
      gameStatus: 'playing',
    })),

  resetGame: () =>
    set(() => ({
      level: 1,
      score: 0,
      missedVegetables: 0,
      capybaraFillPercentage: 0,
      gameStatus: 'playing',
      ceilingHeight: 100,
    })),

  pauseGame: () =>
    set(() => ({
      gameStatus: 'paused',
    })),

  resumeGame: () =>
    set(() => ({
      gameStatus: 'playing',
    })),
}));