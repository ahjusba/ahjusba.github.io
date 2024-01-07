import { useState, useEffect } from 'react'
import ClipboardJS from 'clipboard';
import clipboardImage from '../../images/clipboard.png';

const PokerCalc = () => {
  
  const [history, setHistory] = useState([])
  const [players, setPlayers] = useState([])
  const [payoutStrings, setPayoutStrings] = useState([])

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
      setPayoutStrings([])
    }    
  }

  const handleAddBuyin = (player) => {
    const buyinAmountString = prompt(`Buy-in/out for ${player.name}:`);
    const sanitizedBuyinAmountString = buyinAmountString.replace(/,/g, '.');
    const buyinAmount = parseFloat(sanitizedBuyinAmountString);
    if (!isNaN(buyinAmount)) {
      const updatedPlayer = {
        ...player,
        buyins: [...player.buyins, Number(buyinAmount.toFixed(2))],
        net: player.net - Number(buyinAmount.toFixed(2)),
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
    const totalNetAmount = Number(players.reduce((acc, player) => acc + player.net, 0).toFixed(2))

    let mysteryMoney = {net: 0}
    if(totalNetAmount !== 0) {
      alert(`The Net Sum (Buy-ins + Buy-outs) is not zero but instead ${totalNetAmount} €. Have you marked all the buy-outs as negative? Each player still having chips should be bought out with a negative sum corresponding to the chips.`)
      mysteryMoney = {
        name: "GHOST",
        id: "MysteryMoney",
        net: -1 * totalNetAmount,
      }
    }

    const winners = players.filter(player => player.net > 0).sort((a, b) => b.net - a.net).map(player => ({ ...player }));
    const losers = players.filter(player => player.net < 0).sort((a, b) => a.net - b.net).map(player => ({ ...player }));

    if(mysteryMoney.net < 0) {
      losers.push(mysteryMoney)
    } else {
      winners.push(mysteryMoney)
    }

    let payoutStrings = [];

    for (const loser of losers) {
      let remainingDebt = Math.abs(loser.net);

      for (const winner of winners) {
        if (remainingDebt > 0 && winner.net > 0) {
          const amountToPay = Math.min(remainingDebt, winner.net);
          winner.net -= amountToPay;
          remainingDebt -= amountToPay;

          const newPayoutString = `${loser.name} ${Number(amountToPay.toFixed(2))}€ → ${winner.name}`;
          payoutStrings.push(newPayoutString)
        }
      }
    }

    setPayoutStrings(payoutStrings)
  }

  const handleCopyToClipboard = () => {
    let textToCopy = ""
    for(const payout of payoutStrings) {
      textToCopy += `${payout}\n`
    }

    const clipboard = new ClipboardJS('.copy-button', {
      text: () => textToCopy,
    });

    clipboard.on('success', () => {
      alert('Copied to clipboard: ' + textToCopy)
      clipboard.destroy()
    });

    clipboard.on('error', () => {
      alert('Failed to copy to clipboard')
      clipboard.destroy()
    })  
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
      <div className={"payout"}>
        {payoutStrings.length > 0 && <Payout payoutStrings={payoutStrings} handleCopyToClipboard={handleCopyToClipboard}/>}
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

const Payout = ({ payoutStrings, handleCopyToClipboard }) => {
  return(
    <div>
      <div className={"payoutHeader"}>
        <p>Payout</p>
        <button src={clipboardImage} className={"copy-button"} onClick={handleCopyToClipboard}>
          <img src={clipboardImage} alt="Clipboard" />
        </button>
      </div>
      <ul>
        {payoutStrings.map((payoutString, index) => (
          <li key={index}>{payoutString}</li>
        ))}
      </ul>
    </div>
  )
}

const Player = ({ player, handleAddBuyin }) => {
  return (
    <div className={"player"}>
      <div className={"playerData"}>
          <li className={"playerName"}>
          {player.name}{' '}
          <span className={"playerNet"}>
            {player.net >= 0 ? `(+${Number(player.net.toFixed(2))})` : `(${Number(player.net.toFixed(2))})`}
          </span>
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