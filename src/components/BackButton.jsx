import React from "react";

function BackButton({ onBack }) {
  const handleBack = () => {
    const confirmed = window.confirm(
      "Are you sure you want to go back? Your current game will be lost."
    );
    if (confirmed) {
      onBack();
    }
  };

  return (
    <div>
      <button onClick={handleBack} className="back-button">
        Back to Menu
      </button>
    </div>
  );
}

export default BackButton;
