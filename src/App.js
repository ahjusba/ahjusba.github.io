import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./pages/Home"
import Circlemania from "./pages//Circlemania/Circlemania"
import TicTacToe from "./pages/TicTacToe/TicTacToe"
import GeoAPI from "./pages/GeoAPI/GeoAPI"
import { Route, Routes } from "react-router-dom"

const App = () => {

  return (
    <>
      <Navbar />

      <div className={"main-content"}>
        <Routes>
          <Route path="/" element={<Home content={homeInfo}/>  } />
          <Route path="/circlemania" element={<><Info content={circlemaniaInfo}/><div> <Circlemania/></div></>}/>
          <Route path="/geoAPI" element={<><Info content={geoApiInfo}/><div><GeoAPI/></div></>}/>
          <Route path="/tic-tac-toe" element={<><Info content={tictactoeInfo}/><div> <TicTacToe /></div></>}/>
        </Routes>
      </div>
      
        
      <Footer />
    </>     
  )
}

const Info = ({ content }) => {
  return (
    <div className="info">
      <p>{content}</p>
    </div>
  )
}

//TODO move elsewhere
const homeInfo = <p>Humble web-projects. I rarely add new projects and I hate <p className="css">CSS.</p></p>
const circlemaniaInfo = <p>Infuriating! Annoying! Mindless! A marvel of Game Design!</p>
const geoApiInfo = <p>Fetch and render data from a geographical API. Try it out!</p>
const tictactoeInfo = <p>More practice with undo button and keeping track of previous states.</p>

export default App;
