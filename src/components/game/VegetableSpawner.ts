import type { Vegetable } from '../../types/game.types';
import { GameSettings } from '../../config/GameSettings';

export class VegetableSpawner {
  private container: HTMLElement;
  private spawnTimer: number = 0;
  private readonly vegetableTypes = ['carrot', 'broccoli', 'lettuce', 'tomato', 'pepper'];
  private activeVegetables: Map<string, HTMLElement> = new Map();

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public update(deltaTime: number, level: number): Vegetable[] {
    this.spawnTimer += deltaTime;
    
    const spawnRate = Math.max(800, 2000 - (level * 100));
    const newVegetables: Vegetable[] = [];
    
    if (this.spawnTimer >= spawnRate) {
      const vegetable = this.spawnVegetable(level);
      newVegetables.push(vegetable);
      this.spawnTimer = 0;
    }

    return newVegetables;
  }

  private spawnVegetable(level: number): Vegetable {
    const type = this.vegetableTypes[Math.floor(Math.random() * this.vegetableTypes.length)];
    const x = Math.random() * (this.container.clientWidth - GameSettings.getVegetableSize());
    
    const vegetable: Vegetable = {
      id: Date.now().toString() + Math.random(),
      type: type as any,
      x,
      y: -GameSettings.getVegetableSize(),
      speed: 2 + (level * 0.3),
      points: this.getVegetablePoints(type)
    };

    this.createVegetableElement(vegetable);
    return vegetable;
  }

  private createVegetableElement(vegetable: Vegetable): void {
    const element = document.createElement('div');
    element.className = `vegetable vegetable--${vegetable.type} vegetable--spawning`;
    element.style.left = `${vegetable.x}px`;
    element.style.top = `${vegetable.y}px`;
    element.id = vegetable.id;
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 30 30');
    svg.setAttribute('width', GameSettings.getVegetableSize().toString());
    svg.setAttribute('height', GameSettings.getVegetableSize().toString());
    
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${vegetable.type}`);
    
    svg.appendChild(use);
    element.appendChild(svg);
    
    this.container.appendChild(element);
    this.activeVegetables.set(vegetable.id, element);
    
    // Remove spawn animation class after animation completes
    setTimeout(() => {
      element.classList.remove('vegetable--spawning');
    }, 300);
  }

  public updateVegetablePosition(vegetable: Vegetable): void {
    const element = this.activeVegetables.get(vegetable.id);
    if (element) {
      element.style.top = `${vegetable.y}px`;
    }
  }

  public removeVegetable(id: string): void {
    const element = this.activeVegetables.get(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
      this.activeVegetables.delete(id);
    }
  }

  private getVegetablePoints(type: string): number {
    const points: Record<string, number> = {
      carrot: 5,
      broccoli: 8,
      lettuce: 3,
      tomato: 6,
      pepper: 10
    };
    return points[type] || 5;
  }
}