import { useState } from "react";
import Gameboard from "./components/Gameboard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBOS } from "./winning-combos";
import Gameover from "./components/Gameover";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveGameboard(gameTurns) {
  let gameBoard = [...INITGAMEBOARD.map(array => [...array])];

  for(const turn of gameTurns) {
    const { square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player
  }
  return gameBoard
}

function deriveWinner(gameBoard, players){
  let winner;

  for(const combs of WINNING_COMBOS) {
    const firstSquareSymbol = gameBoard[combs[0].row][combs[0].column];
    const secondSquareSymbol = gameBoard[combs[1].row][combs[1].column];
    const thirdSquareSymbol = gameBoard[combs[2].row][combs[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol] ;
    }
  }
  return winner;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function App() {
  
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  
  const gameBoard = deriveGameboard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleRestart() {
    setGameTurns([])
  }

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' )
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
     
      const updadetTurns = [{square: { row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];

      return updadetTurns;
    })
  }

  function handlePlayerName(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })

  }

  return (
    <main className="h-screen flex flex-col items-center justify-center bg bg-gradient-to-t from-indigo-800 via-purple-800 to-indigo-800">
      <h1 className="text-6xl font-bold uppercase opacity-25 text-center mb-10">Tres en ralla</h1>
      <div id="game-container" className="bg-slate-500 rounded-lg min-w-64 w-5/6 shadow-2xl">
        <ol id="players" className="highlight-player flex flex-row justify-around mt-5">
          <Player 
            isActive={activePlayer === 'X'} 
            name={PLAYERS.X} symbol="X" 
            onChangeName={handlePlayerName}
            />
          <Player 
            isActive={activePlayer === 'O'} 
            name={PLAYERS.O} symbol="O" 
            onChangeName={handlePlayerName}
            />
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} onRestart={handleRestart} />}
        <div className="flex justify-center">
        <Gameboard 
          activePlayerSymbol={activePlayer} 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
          />
          <div className="static">

          <div className="absolute invisible p-10 md:visible">
          <Log 
            turns={gameTurns}
          />
          </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default App
