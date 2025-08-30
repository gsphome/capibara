import type { Vegetable } from '../types/game.types';

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
      vegetable.x + 30 > player.x &&
      vegetable.y < player.y + player.height &&
      vegetable.y + 30 > player.y
    );
  };

  return { checkCollision };
};