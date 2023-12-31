import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import './pages/TicTacToe/TicTacToe.css'
import './pages/Circlemania/Circlemania.css'
import './pages/GeoAPI/GeoAPI.css'
import './pages/PokerCalc/PokerCalc.css'
import { HashRouter  } from "react-router-dom"
 
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter >
    <App />
  </HashRouter >
)