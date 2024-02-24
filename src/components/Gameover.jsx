

export default function Gameover({winner, onRestart}) {
  

  return (
    <div id="game-over" className="bg-yellow-400 rounded absolute w-5/6 h-2/6 p-10 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold">Game Over!</h2>
      {winner && <p className="text-2xl font-medium text-sky-500">{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <button 
      className="bg-slate-800  w-fit rounded-md p-2 text-slate-100 font-medium m-5"
      onClick={onRestart}>Rematch!!</button>
    </div>
  )
}
