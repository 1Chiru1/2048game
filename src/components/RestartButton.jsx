import React from "react";

function RestartButton({ onRestart }) {
  return (
    <div>
      <button onClick={onRestart} className="restart">
        Restart
      </button>
    </div>
  );
}

export default RestartButton;
