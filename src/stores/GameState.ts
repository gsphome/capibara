import type { Vegetable } from '../types/game.types';

export class GameState {
  public level: number = 1;
  public score: number = 0;
  public missedVegetables: number = 0;
  public capybaraFillPercentage: number = 0;
  public gameStatus: 'playing' | 'won' | 'lost' | 'paused' = 'playing';
  public fallSpeed: number = 2;
  public ceilingHeight: number = 100;
  public vegetables: Vegetable[] = [];
  
  private listeners: Array<() => void> = [];

  public addListener(callback: () => void): void {
    this.listeners.push(callback);
  }

  public removeListener(callback: () => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener());
  }

  public addVegetable(vegetable: Vegetable): void {
    this.vegetables.push(vegetable);
    this.notify();
  }

  public removeVegetable(id: string): void {
    this.vegetables = this.vegetables.filter(v => v.id !== id);
    this.notify();
  }

  public incrementLevel(): void {
    this.level += 1;
    this.fallSpeed *= 1.15;
    this.ceilingHeight = Math.max(50, this.ceilingHeight * 0.9);
    this.notify();
  }

  public incrementMissed(): void {
    this.missedVegetables += 1;
    if (this.missedVegetables >= 3) {
      this.gameStatus = 'lost';
    }
    this.notify();
  }

  public updateScore(points: number): void {
    this.score += points;
    this.capybaraFillPercentage = Math.min(100, this.capybaraFillPercentage + points);
    
    if (this.capybaraFillPercentage >= 100) {
      this.gameStatus = 'won';
    }
    
    this.notify();
  }

  public resetForNextLevel(): void {
    this.capybaraFillPercentage = 0;
    this.missedVegetables = 0;
    this.vegetables = [];
    this.notify();
  }

  public resetGame(): void {
    this.level = 1;
    this.score = 0;
    this.missedVegetables = 0;
    this.capybaraFillPercentage = 0;
    this.gameStatus = 'playing';
    this.fallSpeed = 2;
    this.ceilingHeight = 100;
    this.vegetables = [];
    // Don't notify immediately to prevent race conditions
    setTimeout(() => this.notify(), 100);
  }

  public pauseGame(): void {
    this.gameStatus = 'paused';
    this.notify();
  }

  public resumeGame(): void {
    this.gameStatus = 'playing';
    this.notify();
  }
}

// Singleton instance
export const gameState = new GameState();