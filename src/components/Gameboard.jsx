

export default function Gameboard({onSelectSquare, board}) {
 

  // const [gameBoard, setGameBoard] = useState(initGameboard);

  // function handleSelectTale(rowIndex, colIndex) {
    
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //     updatedBoard [rowIndex][colIndex] = activePlayerSymbol;
      
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board" className="bg-gray-600 rounded-lg flex  my-10 w-fit shadow-xl">
      {board.map((row, rowIndex) => (
        <li key={rowIndex} className="gap-3">
          <ol className="">
            {row.map((talesymbol, colIndex) => (
              <li key={colIndex} >
                <button
                  className="bg-slate-100 h-16 w-16 m-5 rounded-md text-xl font-bold shadow-xl"
                  disabled={talesymbol !== null}
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                >{talesymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
