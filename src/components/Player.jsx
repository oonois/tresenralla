import { useState } from "react"

export default function Player({name, symbol, isActive, onChangeName}) {
  const [isEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name)
  
  function handleClick() {
    setEditing(editing=>!editing);
    if(isEditing) {

      onChangeName(symbol, playerName)
    }
  }
  
  let playername = <span className="player-name">{playerName}</span>

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <div className="w-max bg-slate-600 m-5 p-5 rounded-lg shadow-xl">
    <li className={isActive ? 'text-yellow-400' : undefined}>
      <span className="player text-3xl font-medium w-1/4">
        {isEditing ? playername = <input type="text" required value={playerName} onChange={handleChange} className="bg-slate-300 rounded-md  text-gray-800 w-auto flex-col-reverse"/> : playername }
        <span className="player-symbol shadow-inner bg-slate-500 bg-opacity-45 px-3 py-1 mx-5 text-sky-400">{symbol}</span>
      </span>
      <button
        className="text-3xl text-slate-200 hover:text-slate-400 mx-5"
        onClick={handleClick}
      >{isEditing? 'Guarda' : 'Edita'}</button>
    </li>
    </div>
  )
}
