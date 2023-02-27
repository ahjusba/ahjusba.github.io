import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./pages/Home"
import Circlemania from "./pages/Circlemania"
import TicTacToe from "./pages/TicTacToe"
import { Route, Routes } from "react-router-dom"

const App = () => {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/circlemania" element={<Circlemania />} />
        </Routes>
      </div>
      <Footer />
    </>     
  )
}

export default App;
