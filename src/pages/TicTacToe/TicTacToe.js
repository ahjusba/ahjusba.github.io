import { useState } from 'react'

const TicTacToe = () => {
  return (
    <div id="content">
      <h1 id="content-title">Tic-tac-toe</h1>
      <Game />
    </div>

  )
}

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])

  const currentSquares = history[history.length - 1]
  const handlePlay = (nextSquares) => {
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext)
  }
  
  const handleUndo = () => { 
    if(history.length <= 1) {
      return
    }

    const previousHistory = history.slice(0, -1)
    setHistory(previousHistory) 
    setXIsNext(!xIsNext)
  }

  return (
    <div>
      <div className="board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        <Undo onUndoClick={handleUndo} render={(history.length > 1)} />
      </div>
      <div className="game-info">
      </div>
    </div>
  )
}

const Undo = ({onUndoClick, render}) => {
  console.log("Render: ", render)
  if(render) {
    return (
      <button className="undo" onClick={onUndoClick}>undo</button>
    )
  } else {
    return (
      <></>
    )
  }
}

const Board = ({ xIsNext, squares, onPlay }) => {

  const handleClick = (index) => {
    
    //If the square has a value already
    if (squares[index] || calculateWinner(squares)) {
      return
    }

    const value = xIsNext ? "X" : "O"
    const updatedSquares = squares.map((square, i) => {
      return i === index ? value : square
    })
    
    onPlay(updatedSquares)
  }

  const getStatusMessage = () => {

    const winner = calculateWinner(squares)

    if (winner) {
      return `Winner is ${winner}`
    }

    if (boardIsFilled(squares)) {
      return `Tie`
    }

    return `player = ${xIsNext ? "X" : "O" }` 
  }

  return (
    <>
      <div className="status">
        <Status status={getStatusMessage()}/>
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </>
  )
}

const Status = ({ status }) => {
  return(
    <>
      <h1>
        {status}
      </h1>
    </>
  )
}

const Square = ({ value, onSquareClick }) => {
  return (
    <>
      <button
        className="square"
        onClick={onSquareClick}>
        {value}
      </button>
    </>
  )
}

//Static functions
const boardIsFilled = (squares) => {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) return false
  }

  return true
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
    let [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a] //Returns value "X" or "O"
    }
    
  }
  return null
}

export default TicTacToe