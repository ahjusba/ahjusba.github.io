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

      <main>
        <Routes>
          <Route path="/" element={                                                                                 <Home content={homeInfo}/>  } />
          <Route path="/circlemania" element={<>  <Sidebar content={circlemaniaInfo}/>  <div className="container"> <Circlemania /> </div>  </> } />
          <Route path="/geoAPI"      element={<>  <Sidebar content={geoApiInfo}/>  <div className="container"> <GeoAPI />      </div>       </> } />
          <Route path="/tic-tac-toe" element={<>  <Sidebar content={tictactoeInfo}/>    <div className="container"> <TicTacToe />   </div>  </> } />
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
const homeInfo = <>As a programmer, I couldn't resist the temptation to create a website with a code editor theme. 
I mean, how original is that? But, putting that aside, 
I've had a blast crafting a few smaller web projects that rely on React frontend. 
Feel free to take a peek and see what I've been up to. 
And, just a heads up, this site will forever be a work in progress, until the end of time.</>
const circlemaniaInfo = <>Click-click-click... Who will win: YOU or a couple of bouncy bois<br></br><br></br>Modified from a MDN-tuorial and fitted to React</>
const geoApiInfo = <>While I haven't traveled overseas since late 2019, I must confess that I wouldn't mind having this incredibly awesome geography app over visiting some mediocre beaches and congested cities.</>
const tictactoeInfo = <>You can challenge.... YOURSELF! Amazing.<br></br><br></br>Straight from the official React-tutorial. Remember: these are <i>humble</i>-projects, goddamnit</>

export default App;
