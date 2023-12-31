import { useState, useEffect } from 'react'

const PokerCalc = () => {
  
  const [history, setHistory] = useState([])
  const [players, setPlayers] = useState([])

  useEffect(() => {
    // Load players and history from local storage when the component mounts
    const storedPlayers = localStorage.getItem('players');
    const storedHistory = localStorage.getItem('history');

    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }

    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Save players and history to local storage whenever they change
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('history', JSON.stringify(history));
  }, [players, history]);

  const handleAddPlayer = () => {
    const playerName = prompt('Enter the name of the player:');
    if (playerName) {
      const playerId = players.length + 1;

      const newPlayer = {
        id: playerId,
        name: playerName,
        buyins: [],
        net: 0,
      };

      setHistory([...history, players])
      setPlayers([...players, newPlayer]);
    }
  }

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setPlayers(previousState);
      setHistory(history.slice(0, -1));
    }
  }

  const handleReset = () => {
    const userConfirmed = window.confirm("Are you sure you want to RESET everything?")
    if(userConfirmed) {
      setPlayers([])
      setHistory([])
    }    
  }

  const handleAddBuyin = (player) => {
    const buyinAmountString = prompt(`Buy-in/out for ${player.name}:`);
    const sanitizedBuyinAmountString = buyinAmountString.replace(/,/g, '.');
    const buyinAmount = parseFloat(sanitizedBuyinAmountString);
    if (!isNaN(buyinAmount)) {
      const updatedPlayer = {
        ...player,
        buyins: [...player.buyins, buyinAmount],
        net: player.net + buyinAmount,
      };
      const playerIndex = players.findIndex((p) => p.id === player.id);

      setHistory([...history, players]);
      setPlayers([
        ...players.slice(0, playerIndex),
        updatedPlayer,
        ...players.slice(playerIndex + 1),
      ]);      
    }
  }

  const handlePayout = () => {    
    const totalNetAmount = players.reduce((acc, player) => acc + player.net, 0)

    if(totalNetAmount !== 0) {
      alert(`The Net Sum (Buy-ins + Buy-outs) is not zero but instead ${totalNetAmount} €. Have you marked all the buy-outs as negative? Each player still having chips should be bought out with a negative sum corresponding to the chips.`)
      const mysterMoney = {
        name: "MysteryMoney",
        id: "MysteryMoney",
        netAmount: -1 * totalNetAmount,
      }
    }
  }

  return(
    <div className={"pokerCalc"}>
      <div className={"playerList"}>
        <ul>
          {players.map((player) => (
            <Player key={player.id} player={player} handleAddBuyin={handleAddBuyin} />
            ))}
        </ul>
      </div>      
      <div className={"buttons"}>
        <button className={"bigbutton"} onClick={handleReset}>Reset</button>
        <button className={"bigbutton"} onClick={handlePayout}>Payout</button>
        <button className={"bigbutton"} onClick={handleUndo}>Undo</button>
        <button className={"bigbutton"} onClick={handleAddPlayer}>Add player</button>
      </div>      
    </div>
  )
}

const Player = ({ player, handleAddBuyin }) => {
  return (
    <div className={"player"}>
      <div className={"playerData"}>
          <li className={"playerName"}>
            {player.name} {player.net >= 0 ? `(+${player.net})` : `(${player.net})`}
          </li>     
        <div className={"buyins"}>
          {player.buyins.map((buyin) => (
            <li>{buyin}</li>
          ))} 
        </div>   
               
      </div>
      <button className={"smallbutton"} onClick={() => handleAddBuyin(player)}>BI/BO</button>
    </div>
    
  )
}

export default PokerCalc;