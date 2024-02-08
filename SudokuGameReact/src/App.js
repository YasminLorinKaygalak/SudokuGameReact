import React from 'react';
import {useState} from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [statusHelp, setStatusHelp] = useState();

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    const newSquares = squares.slice();
    const numX = newSquares.filter(val => val === 'X').length;
    
    if (xIsNext) {
      if (numX === 0) {
        if (i === 0 || i === 2 || i === 6 || i === 8) {
          setStatusHelp('Good choice!');
        } 
        else {
          setStatusHelp('Not a good choice!');
          return; 
        }
      } 
      else if (numX === 1) {
        if (newSquares[4] === 'O') {
          const oppositeCorner = 8 - newSquares.findIndex((val, index) => val === 'X' && [0, 2, 6, 8].includes(index));
          if (i === oppositeCorner) {
            setStatusHelp('Good choice!');
          } 
          else {
            setStatusHelp('Not a good choice!');
            return; 
          }
        } 
        else {
          const corners = [0, 2, 6, 8];
          const firstXIndex = squares.findIndex(square => square === 'X'); 
          const secondXIndex = i; 
          if (corners.includes(secondXIndex)) {
            if (!((firstXIndex === 0 && secondXIndex === 8) || 
                  (firstXIndex === 2 && secondXIndex === 6) || 
                  (firstXIndex === 6 && secondXIndex === 2) || 
                  (firstXIndex === 8 && secondXIndex === 0))) {
              const betweenIndex = (firstXIndex + secondXIndex) / 2;
              const sameRow = (firstXIndex / 3 | 0) === (secondXIndex / 3 | 0);
              const sameColumn = firstXIndex % 3 === secondXIndex % 3;
              if ((sameRow || sameColumn) && squares[betweenIndex] === 'O') {
               setStatusHelp('Not a good choice!');
                return;
              } 
              else {
                setStatusHelp('Good choice!');
              }
            } 
            else {
              setStatusHelp('Not a good choice!');
              return;
            }
          } 
          else {
            setStatusHelp('Not a good choice!');
            return;
          }
        }
      }
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="status-help">{statusHelp}</div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
