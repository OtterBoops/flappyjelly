import { React } from "react"
import { useSelector } from "react-redux"

import Header from "./components/Header"
import GameArea from "./components/GameArea"
import Footer from "./components/Footer"

function App() {
  const score = useSelector((state) => state.game.score)
  const running = useSelector((state) => state.game.running)
  return (
    <div className="App flex flex-col justify-between items-center w-full">
      <Header />
      <div>{score}</div>
      <div>{running.toString()}</div>
      <GameArea />
      <Footer />
    </div>
  );
}

export default App