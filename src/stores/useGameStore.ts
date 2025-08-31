import { createStore } from 'zustand/vanilla';
import type { Vegetable } from '../types/game.types';
import { GameSettings } from '../config/GameSettings';

export interface GameState {
  // Game state
  level: number;
  score: number;
  missedVegetables: number;
  capybaraFillPercentage: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'paused';
  fallSpeed: number;
  ceilingHeight: number;
  vegetables: Vegetable[];
  
  // Actions
  addVegetable: (vegetable: Vegetable) => void;
  removeVegetable: (id: string) => void;
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
  fallSpeed: 2,
  ceilingHeight: 100,
  vegetables: [],

  // Actions
  addVegetable: (vegetable: Vegetable) =>
    set((state) => ({
      vegetables: [...state.vegetables, vegetable],
    })),

  removeVegetable: (id: string) =>
    set((state) => ({
      vegetables: state.vegetables.filter((v) => v.id !== id),
    })),

  incrementLevel: () =>
    set((state) => ({
      level: state.level + 1,
      fallSpeed: state.fallSpeed * 1.15,
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
      const newFillPercentage = Math.min(100, state.capybaraFillPercentage + points);
      return {
        score: state.score + points,
        capybaraFillPercentage: newFillPercentage,
        gameStatus: newFillPercentage >= GameSettings.LEVEL_UP_THRESHOLD ? 'won' : state.gameStatus,
      };
    }),

  resetForNextLevel: () =>
    set(() => ({
      capybaraFillPercentage: 0,
      missedVegetables: 0,
      vegetables: [],
      gameStatus: 'playing',
    })),

  resetGame: () =>
    set(() => ({
      level: 1,
      score: 0,
      missedVegetables: 0,
      capybaraFillPercentage: 0,
      gameStatus: 'playing',
      fallSpeed: 2,
      ceilingHeight: 100,
      vegetables: [],
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