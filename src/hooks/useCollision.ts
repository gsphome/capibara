import type { Vegetable } from '../types/game.types';
import { GameSettings } from '../config/GameSettings';

interface PlayerBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useCollision = () => {
  const checkCollision = (
    player: PlayerBounds, 
    vegetable: Vegetable
  ): boolean => {
    return (
      vegetable.x < player.x + player.width &&
      vegetable.x + GameSettings.VEGETABLE_SIZE > player.x &&
      vegetable.y < player.y + player.height &&
      vegetable.y + GameSettings.VEGETABLE_SIZE > player.y
    );
  };

  return { checkCollision };
};