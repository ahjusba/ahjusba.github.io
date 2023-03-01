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
        <Routes>
          <Route path="/" element={                                                                                 <Home content={homeInfo}/>  } />
          <Route path="/tic-tac-toe" element={<>  <Sidebar content={tictactoeInfo}/>    <div className="container"> <TicTacToe />   </div>  </> } />
          <Route path="/circlemania" element={<>  <Sidebar content={circlemaniaInfo}/>  <div className="container"> <Circlemania /> </div>  </> } />
        </Routes>
      </main>     
        
      <Footer />
    </>     
  )
}

const Sidebar = ({ content }) => {
  return (
    <div className="sidebar">
      <h1>info</h1>
      <p>{content}</p>
    </div>
  )
}

//TODO move elsewhere
const homeInfo = <>I've enjoyed making a few smaller web projects focusing on React-frontend. Go ahead and have a look!<br></br><br></br>(Work in progress till the end of time)</>
const tictactoeInfo = <>You can challenge.... YOURSELF! Amazing.<br></br><br></br>Straight from the official React-tutorial. Remember: these are <i>humble</i>-projects, goddamnit</>
const circlemaniaInfo = <>Click-click-click... Who will win: YOU or a couple of bouncy bois<br></br><br></br>Modified from a MDN-tuorial and fitted to React</>

export default App;
