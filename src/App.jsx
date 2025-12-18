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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleMove = useCallback((direction) => {
    if (gameOver) return;

    let processedBoard;
    const currentBoardCopy = board.map((row) => [...row]);

    if (direction === "left") processedBoard = moveLeft(currentBoardCopy);
    else if (direction === "right") processedBoard = moveRight(currentBoardCopy);
    else if (direction === "up") processedBoard = moveUp(currentBoardCopy);
    else if (direction === "down") processedBoard = moveDown(currentBoardCopy);
    else return;

    if (JSON.stringify(board) !== JSON.stringify(processedBoard)) {
      const boardWithNewTile = addRandomTile(processedBoard);
      setBoard(boardWithNewTile);

      if (isGameOver(boardWithNewTile)) {
        setGameOver(true);
      }
    }
  }, [board, gameOver]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") handleMove("left");
    else if (e.key === "ArrowRight") handleMove("right");
    else if (e.key === "ArrowUp") handleMove("up");
    else if (e.key === "ArrowDown") handleMove("down");
  }, [handleMove]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) > minSwipeDistance) {
        handleMove(distanceX > 0 ? "left" : "right");
      }
    } else {
      if (Math.abs(distanceY) > minSwipeDistance) {
        handleMove(distanceY > 0 ? "up" : "down");
      }
    }
  };

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
      <div 
        className="board-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Board board={board} />
        <GameOver isGameOver={gameOver} />
      </div>
      <RestartButton onRestart={restartGame} />
    </div>
  );
}

export default App;
