import { gameState } from '../../stores/GameState';
import { CapybaraPlayer } from './CapybaraPlayer';
import { VegetableSpawner } from './VegetableSpawner';
import { ParticleSystem } from '../effects/ParticleSystem';
import { GameHUD } from '../ui/GameHUD';
import { GameOverScreen } from '../ui/GameOverScreen';
import { LevelTransition } from '../ui/LevelTransition';
import { PauseOverlay } from '../ui/PauseOverlay';
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
  private animationId: number = 0;
  private lastTime: number = 0;
  private vegetables: Vegetable[] = [];

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
    this.pauseOverlay = new PauseOverlay(this.container);

    // Listen to game state changes
    gameState.addListener(() => this.handleGameStateChange());

    // Start game loop
    this.gameLoop(0);

    // Setup keyboard controls
    this.setupKeyboardControls();
  }

  private handleGameStateChange(): void {
    if (gameState.gameStatus === 'paused') {
      this.pauseOverlay.show(() => gameState.resumeGame());
    } else if (gameState.gameStatus === 'playing') {
      this.pauseOverlay.hide();
    } else if (gameState.gameStatus === 'won') {
      this.levelTransition.show(gameState.level);
      setTimeout(() => {
        gameState.resetForNextLevel();
        gameState.gameStatus = 'playing';
      }, 2000);
    } else if (gameState.gameStatus === 'lost') {
      this.gameOverScreen.show(false, gameState.score, gameState.level);
    }
  }

  private setupKeyboardControls(): void {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case ' ':
        case 'Escape':
          e.preventDefault();
          if (gameState.gameStatus === 'playing') {
            gameState.pauseGame();
          } else if (gameState.gameStatus === 'paused') {
            gameState.resumeGame();
          }
          break;
        case 'r':
        case 'R':
          if (gameState.gameStatus === 'lost' || gameState.gameStatus === 'won') {
            this.restart();
          }
          break;
      }
    });
  }

  private gameLoop(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (gameState.gameStatus === 'playing') {
      this.update(deltaTime);
      this.render();
    } else if (gameState.gameStatus === 'paused') {
      // Game is paused, don't update but keep rendering
    }

    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  private update(deltaTime: number): void {
    // Spawn new vegetables
    const newVegetables = this.spawner.update(deltaTime, gameState.level);
    this.vegetables.push(...newVegetables);

    // Update existing vegetables
    this.vegetables = this.vegetables.filter(vegetable => {
      vegetable.y += vegetable.speed;
      this.spawner.updateVegetablePosition(vegetable);

      // Check collision with player
      const playerBounds = this.player.getBounds();
      if (this.checkCollision(playerBounds, vegetable)) {
        // Caught vegetable
        gameState.updateScore(vegetable.points);
        this.particles.createCatchEffect(vegetable.x, vegetable.y);
        this.spawner.removeVegetable(vegetable.id);
        
        // Add bounce animation to player
        const playerElement = this.container.querySelector('.capybara-player');
        if (playerElement) {
          playerElement.classList.add('capybara-player--catch');
          setTimeout(() => {
            playerElement.classList.remove('capybara-player--catch');
          }, 500);
        }
        
        return false;
      }

      // Check if vegetable fell off screen
      if (vegetable.y > this.container.clientHeight) {
        gameState.incrementMissed();
        this.spawner.removeVegetable(vegetable.id);
        return false;
      }

      return true;
    });

    // Update particles
    this.particles.update();

    // Update UI
    this.hud.updateScore(gameState.score);
    this.hud.updateLevel(gameState.level);
    this.hud.updateLives(3 - gameState.missedVegetables);
    this.hud.updateProgress(gameState.capybaraFillPercentage);
    this.player.updateFill(gameState.capybaraFillPercentage);

    // Level progression is handled by capybara fill reaching 100%
    // No need to check score thresholds here
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
    gameState.resetGame();
    
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

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.player.destroy();
    this.particles.destroy();
    this.hud.destroy();
    this.gameOverScreen.destroy();
  }
}