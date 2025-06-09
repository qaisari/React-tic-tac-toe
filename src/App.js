import './App.css';
import { useState } from 'react';

function HistoryButton({moveCount, onClick}) {
  return (
    <button onClick={onClick} className='historyB'>
      Go to move #{moveCount}
    </button>
  );
}

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState("❌");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [history, setHistory] = useState([]);
  const [text, setText] = useState("Start");
  const [currentMove, setCurrentMove] = useState(0);
  
  function jumpTo(moveIndex) {
    setCurrentMove(moveIndex);
    setBoard(history[moveIndex]);
    setHistory(history.slice(0, moveIndex+1));
    if (moveIndex % 2 === 0) {
      setCurrentPlayer("⭕");
    } else {
      setCurrentPlayer("❌");
    }
  }

  function handleClick(position) {
    if(board[position] !== ""){
      alert("Current position is occupied!");
      return;
    }

    const newBoard = board.slice();
    newBoard[position] = currentPlayer;
    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newBoard]);
    setBoard(newBoard);
    setCurrentMove(newHistory.length);

    if (checkWin(newBoard)) {
      setText(`Player ${currentPlayer} Won!`);
      setTimeout(() => {
        setBoard(Array(9).fill(""));
        setHistory([]);
      }, 500);
      return;
    }

    if (newBoard.every(cell => cell !== "")) {
      setText("The game is draw");
      setTimeout(() => {
        setBoard(Array(9).fill(""));
        setHistory([]);
      }, 500);
      return;
    }
    
    setCurrentPlayer(currentPlayer === "❌" ? "⭕" : "❌");
    setTimeout(() => {
      setText("Start");
    }, 2000);
  }

  function checkWin(newBoard) {
    const conditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return conditions.some(([a,b,c]) => 
      newBoard[a] === currentPlayer &&
      newBoard[b] === currentPlayer &&
      newBoard[c] === currentPlayer
    );
  }
  return (
    <div className='Game'>
      <h1 className='text'>{text}</h1>
      <div className='gameContent'>
        <div className='board'>
          {board.map((value, idx) => (
            <button className='square' onClick={() => handleClick(idx)}>
              {value}
            </button>
          ))}
        </div>
        <div className='history'>
          {history.map(( value, idx) => (
            <HistoryButton
            key={idx}
            moveCount={idx + 1}
            onClick={() => jumpTo(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

















// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
