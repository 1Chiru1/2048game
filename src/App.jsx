import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import RestartButton from "./components/RestartButton";
import Welcome from "./components/Welcome";
import BackButton from "./components/BackButton";
import {
  initializeBoard,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isGameOver,
} from "./utils/gameLogic";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(() => initializeBoard());
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;

    let processedBoard;
    const currentBoardCopy = board.map((row) => [...row]);

    if (e.key === "ArrowLeft") processedBoard = moveLeft(currentBoardCopy);
    else if (e.key === "ArrowRight")
      processedBoard = moveRight(currentBoardCopy);
    else if (e.key === "ArrowUp") processedBoard = moveUp(currentBoardCopy);
    else if (e.key === "ArrowDown") processedBoard = moveDown(currentBoardCopy);
    else return;

    if (JSON.stringify(board) !== JSON.stringify(processedBoard)) {
      const boardWithNewTile = addRandomTile(processedBoard);
      setBoard(boardWithNewTile);

      if (isGameOver(boardWithNewTile)) {
        setGameOver(true);
      }
    }
  }, [board, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const startGame = () => {
    setGameStarted(true);
    setBoard(initializeBoard());
    setGameOver(false);
  };

  const restartGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
  };

  const backToMenu = () => {
    setGameStarted(false);
    setBoard(initializeBoard());
    setGameOver(false);
  };

  if (!gameStarted) {
    return (
      <div className="container">
        <Welcome onStart={startGame} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>2048 Game</h1>
        <BackButton onBack={backToMenu} />
      </div>
      <div className="board-container">
        <Board board={board} />
        <GameOver isGameOver={gameOver} />
      </div>
      <RestartButton onRestart={restartGame} />
    </div>
  );
}

export default App;
