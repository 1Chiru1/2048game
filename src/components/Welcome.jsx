import React from "react";

function Welcome({ onStart }) {
  return (
    <div className="welcome-screen">
      <h1>Welcome to 2048 Game</h1>
      <p>Join the numbers and get to the 2048 tile!</p>
      <button onClick={onStart} className="start-button">
        Start Game
      </button>
    </div>
  );
}

export default Welcome;
