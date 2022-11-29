import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGameOver } from './redux/gameSlice';

import Header from './components/Header';
import GameArea from './components/GameArea';
import Footer from './components/Footer';
import StatsArea from './components/StatsArea';
import Clouds from './assets/Background1.jpg';

if (localStorage.getItem('scores') === null)
  localStorage.setItem('scores', JSON.stringify([]));

function App() {
  const dispatch = useDispatch();

  const [random, setRandom] = useState();

  const resetScores = () => {
    localStorage.setItem('scores', JSON.stringify([]));
    setRandom(Math.random());
    dispatch(setGameOver(false));
  };

  const update = () => {
    setRandom(Math.random());
  };

  let scores = JSON.parse(localStorage.getItem('scores'));

  return (
    <div
      className='App flex flex-col justify-between items-center w-full bg-[#b6eaff] bg-contain bg-no-repeat bg-bottom'
      style={{ backgroundImage: `url(${Clouds})` }}>
      <Header />
      <main className='w-full flex justify-evenly items-center flex-col grow '>
        <GameArea update={() => update()} />
        <StatsArea
          name={random}
          scores={scores}
          reset={() => resetScores()}
          update={() => update()}
        />
      </main>
      <Footer />

      <Small />
    </div>
  );
}

const Small = () => {
  return (
    <div className='w-full h-full hidden xs:flex fixed top-0 left-0 bg-slate-200 z-30 justify-center items-center text-4xl text-center'>
      Your device is too small to play this game.
    </div>
  );
};

export default App;
