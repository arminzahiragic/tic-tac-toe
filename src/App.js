import { useState, useEffect } from "react";
import Board from './components/Board';
import GameResultModal from "./components/GameResultModal";
import GameModeSelector from "./components/GameModeSelector"; 

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vsComputer, setVsComputer] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  useEffect(() => {
    if (vsComputer && !xIsNext && isComputerTurn) {
      // If it's the computer's turn, choose a random square
      setTimeout(() => {
        const emptySquares = squares.reduce(
          (acc, curr, idx) => (curr === null ? [...acc, idx] : acc),
          []
        );
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const squareIndexToUpdate = emptySquares[randomIndex];
        setIsComputerTurn(false);
        handleClick(squareIndexToUpdate);
      }, 1000); // Delay the computer's move by 1 second to make it more realistic
    }
  }, [squares, xIsNext, vsComputer, isComputerTurn]);
  

  function handleClick(i) {
    const newSquares = [...squares];
    if (winner || squares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    const newWinner = calculateWinner(newSquares);
    if (newWinner || newSquares.every((square) => square !== null)) {
      setWinner(newWinner);
      setShowModal(true);
      if (newWinner === 'X') {
        setXScore(xScore + 1);
      } else if (newWinner === 'O') {
        setOScore(oScore + 1);
      }
    }

    if (vsComputer && xIsNext) {
      setIsComputerTurn(true);
    }

    setHistory([...history, newSquares]);
  }
  
  function handleUndo() {
    if (history.length > 1) { // Check if history has more than 1 item
      const newHistory = [...history];
      newHistory.pop(); // Remove last item from history
      setHistory(newHistory);
      const newSquares = newHistory[newHistory.length - 1]; // Get the last item in history
      setSquares(newSquares);
      setXIsNext(!xIsNext);
      setIsComputerTurn(true);
    }
  }

  const renderStatus = () => {
    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (squares.every((square) => square)) {
      return 'Draw';
    }
    return (
      <>
        <div className="next-player">Next player: {xIsNext ? 'X' : 'O'}</div>
        <div className="score-counter">Score: X {xScore} - O {oScore}</div>
       
      </>
    );
  };
  

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setShowModal(false);
    setIsComputerTurn(false);
  }

  function toggleVsComputer() {
    setVsComputer(!vsComputer);
    resetGame();
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{renderStatus()}</div>
        {showModal && (
          <GameResultModal winner={winner} onClose={() => setShowModal(false)} />
        )}
        <button className="reset-button" onClick={() => resetGame()}>
          Reset
        </button>
        <button className="undo-button" onClick={handleUndo}>Undo</button>
        <div><GameModeSelector vsComputer={vsComputer} onChange={toggleVsComputer} /></div>
      </div>
    </div>
  );  
};

export default App;
