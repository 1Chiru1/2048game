import React from "react";

function GameOver({ isGameOver }) {
  if (!isGameOver) return null;
  
  return <div className="game-over">Game Over</div>;
}

export default GameOver;
