import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./pages/Home"
import Circlemania from "./pages//Circlemania/Circlemania"
import TicTacToe from "./pages/TicTacToe/TicTacToe"
import { Route, Routes } from "react-router-dom"

const App = () => {

  return (
    <>
      <Navbar />

      <main>
        <div className="sidebar">
          <p>More info soon...</p>
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/circlemania" element={<Circlemania />} />
          </Routes>
        </div>
      </main>     
        
      <Footer />
    </>     
  )
}

export default App;
