import { useGameStore } from '../../stores/useGameStore';
import type { GameState } from '../../stores/useGameStore';
import { CapybaraPlayer } from './CapybaraPlayer';
import { VegetableSpawner } from './VegetableSpawner';
import { ParticleSystem } from '../effects/ParticleSystem';
import { GameHUD } from '../ui/GameHUD';
import { GameOverScreen } from '../ui/GameOverScreen';
import { LevelTransition } from '../ui/LevelTransition';
import { PauseOverlay } from '../ui/PauseOverlay';
import { HelpModal } from '../ui/HelpModal';
import { AudioToggle } from '../ui/AudioToggle';
import { AudioManager } from '../../audio/AudioManager';
import type { Vegetable } from '../../types/game.types';

export class GameEngine {
  private container: HTMLElement;
  private player!: CapybaraPlayer;
  private spawner!: VegetableSpawner;
  private particles!: ParticleSystem;
  private hud!: GameHUD;
  private gameOverScreen!: GameOverScreen;
  private levelTransition!: LevelTransition;
  private pauseOverlay!: PauseOverlay;
  private helpModal!: HelpModal;
  private audioToggle!: AudioToggle;
  private audioManager = AudioManager.getInstance();
  private animationId: number = 0;
  private lastTime: number = 0;
  private vegetables: Vegetable[] = [];
  private gameStore = useGameStore;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private init(): void {
    // Initialize game components
    this.player = new CapybaraPlayer(this.container);
    this.spawner = new VegetableSpawner(this.container);
    this.particles = new ParticleSystem(this.container);
    this.hud = new GameHUD(this.container);
    this.gameOverScreen = new GameOverScreen(this.container, () => this.restart());
    this.levelTransition = new LevelTransition(this.container);
    this.pauseOverlay = new PauseOverlay(this.container, () => this.helpModal.show());
    this.helpModal = new HelpModal();
    this.audioToggle = new AudioToggle(document.body);

    // Subscribe to Zustand store changes
    useGameStore.subscribe((state) => this.handleGameStateChange(state));

    // Start game loop
    this.gameLoop(0);

    // Setup keyboard controls
    this.setupKeyboardControls();
  }

  private levelTransitionActive = false;

  private handleGameStateChange(state: GameState): void {
    if (state.gameStatus === 'paused') {
      this.pauseOverlay.show(() => this.gameStore.getState().resumeGame());
    } else if (state.gameStatus === 'playing') {
      this.pauseOverlay.hide();
    } else if (state.gameStatus === 'won' && !this.levelTransitionActive) {
      this.levelTransitionActive = true;
      this.audioManager.play('levelup');
      this.levelTransition.show(state.level + 1);
      setTimeout(() => {
        this.gameStore.getState().incrementLevel();
        this.gameStore.getState().resetForNextLevel();
        this.levelTransitionActive = false;
      }, 2000);
    } else if (state.gameStatus === 'lost') {
      this.audioManager.play('gameover');
      this.gameOverScreen.show(false, state.score, state.level);
    }
  }

  private setupKeyboardControls(): void {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case ' ':
        case 'Escape':
          e.preventDefault();
          const currentState = this.gameStore.getState();
          if (currentState.gameStatus === 'playing') {
            currentState.pauseGame();
          } else if (currentState.gameStatus === 'paused') {
            currentState.resumeGame();
          }
          break;
        case 'r':
        case 'R':
          const state = this.gameStore.getState();
          if (state.gameStatus === 'lost' || state.gameStatus === 'won') {
            this.restart();
          }
          break;
      }
    });
  }

  private gameLoop(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    const currentState = this.gameStore.getState();
    if (currentState.gameStatus === 'playing') {
      this.update(deltaTime);
      this.render();
    } else if (currentState.gameStatus === 'paused') {
      // Game is paused, don't update but keep rendering
    }

    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  private update(deltaTime: number): void {
    const state = this.gameStore.getState();
    
    // Spawn new vegetables
    const newVegetables = this.spawner.update(deltaTime, state.level);
    this.vegetables.push(...newVegetables);

    // Update existing vegetables
    this.vegetables = this.vegetables.filter(vegetable => {
      vegetable.y += vegetable.speed;
      this.spawner.updateVegetablePosition(vegetable);

      // Check collision with player
      const playerBounds = this.player.getBounds();
      if (this.checkCollision(playerBounds, vegetable)) {
        // Caught vegetable
        this.audioManager.play('catch');
        state.updateScore(vegetable.points);
        this.particles.createCatchEffect(vegetable.x, vegetable.y);
        this.spawner.removeVegetable(vegetable.id);
        
        // Add bounce animation to player
        const playerElement = this.container.querySelector('.capybara-player');
        if (playerElement) {
          playerElement.classList.add('capybara-player--catch');
          setTimeout(() => {
            playerElement.classList.remove('capybara-player--catch');
          }, 600);
        }
        
        // Score popup animation
        this.createScorePopup(vegetable.x, vegetable.y, vegetable.points);
        
        return false;
      }

      // Check if vegetable fell off screen
      if (vegetable.y > this.container.clientHeight) {
        this.audioManager.play('miss');
        state.incrementMissed();
        this.spawner.removeVegetable(vegetable.id);
        return false;
      }

      return true;
    });

    // Update particles
    this.particles.update();

    // Update UI with current state
    const currentState = this.gameStore.getState();
    this.hud.updateScore(currentState.score);
    this.hud.updateLevel(currentState.level);
    this.hud.updateLives(3 - currentState.missedVegetables);
    this.hud.updateProgress(currentState.capybaraFillPercentage);
    this.player.updateFill(currentState.capybaraFillPercentage);
  }

  private render(): void {
    this.particles.render();
  }

  private checkCollision(player: any, vegetable: Vegetable): boolean {
    return (
      vegetable.x < player.x + player.width &&
      vegetable.x + 30 > player.x &&
      vegetable.y < player.y + player.height &&
      vegetable.y + 30 > player.y
    );
  }

  private restart(): void {
    // Reset game state
    this.gameStore.getState().resetGame();
    
    // Clear vegetables
    this.vegetables.forEach(vegetable => {
      this.spawner.removeVegetable(vegetable.id);
    });
    this.vegetables = [];
    
    // Hide game over screen
    this.gameOverScreen.hide();
    
    // Reset UI
    this.hud.updateScore(0);
    this.hud.updateLevel(1);
    this.hud.updateLives(3);
    this.hud.updateProgress(0);
    this.player.updateFill(0);
  }

  private createScorePopup(x: number, y: number, points: number): void {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = `+${points}`;
    popup.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      color: #FFD700;
      font-weight: bold;
      font-size: 1.2rem;
      pointer-events: none;
      z-index: 1000;
    `;
    
    this.container.appendChild(popup);
    
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 1000);
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.player.destroy();
    this.particles.destroy();
    this.hud.destroy();
    this.gameOverScreen.destroy();
    this.audioToggle.destroy();
  }
}