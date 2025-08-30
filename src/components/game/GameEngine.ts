import { gameState } from '../../stores/GameState';
import { CapybaraPlayer } from './CapybaraPlayer';
import { VegetableSpawner } from './VegetableSpawner';
import { ParticleSystem } from '../effects/ParticleSystem';
import { GameHUD } from '../ui/GameHUD';
import { GameOverScreen } from '../ui/GameOverScreen';
import type { Vegetable } from '../../types/game.types';

export class GameEngine {
  private container: HTMLElement;
  private player!: CapybaraPlayer;
  private spawner!: VegetableSpawner;
  private particles!: ParticleSystem;
  private hud!: GameHUD;
  private gameOverScreen!: GameOverScreen;
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

    // Start game loop
    this.gameLoop(0);

    // Setup keyboard controls
    this.setupKeyboardControls();
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
    }

    // Handle game over states
    if (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
      this.gameOverScreen.show(
        gameState.gameStatus === 'won',
        gameState.score,
        gameState.level
      );
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
      if (vegetable.y > window.innerHeight) {
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
    this.hud.updateMissed(gameState.missedVegetables);
    this.hud.updateProgress(gameState.capybaraFillPercentage);
    this.player.updateFill(gameState.capybaraFillPercentage);

    // Check for level progression
    if (gameState.score > 0 && gameState.score % 100 === 0 && gameState.capybaraFillPercentage < 100) {
      gameState.incrementLevel();
    }
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
    this.hud.updateMissed(0);
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