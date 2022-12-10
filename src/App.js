import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleFlip,
  setGameOver,
  toggleMute,
  setBigMayo,
  setHardMode,
} from './redux/gameSlice';

import Header from './components/Header';
import GameArea from './components/GameArea';
import Footer from './components/Footer';
import StatsArea from './components/StatsArea';
import Clouds from './assets/Bg.jpg';
import Cheats from './components/Cheats';

if (localStorage.getItem('scores') === null)
  localStorage.setItem('scores', JSON.stringify([]));

function App() {
  const dispatch = useDispatch();

  const [random, setRandom] = useState();
  const [random2, setRandom2] = useState();

  const update = () => {
    setRandom(Math.random());
    setRandom2(Math.random());
  };

  const cheats = {
    flip: () => {
      dispatch(toggleFlip());
    },
    reset: () => {
      localStorage.setItem('scores', JSON.stringify([]));
      setRandom(Math.random());
      dispatch(setGameOver(false));
    },
    mute: () => {
      dispatch(toggleMute());
    },
    bigMayo: () => {
      dispatch(setBigMayo());
    },
    hardMode: () => {
      dispatch(setHardMode());
    },
  };

  let scores = JSON.parse(localStorage.getItem('scores'));

  return (
    <div
      className='App flex flex-col justify-between items-center w-full bg-[#b6eaff] bg-contain bg-no-repeat bg-bottom'
      style={{
        backgroundImage: `url(${Clouds})`,
        transform: `${useSelector((state) =>
          state.game.flipped ? 'rotate(180deg)' : ''
        )}`,
      }}>
      <Header />

      <Cheats
        reset={() => cheats.reset()}
        flip={() => cheats.flip()}
        mute={() => cheats.mute()}
        bigMayo={() => cheats.bigMayo()}
        hardMode={() => cheats.hardMode()}
      />

      <main className='w-full flex s:flex-col justify-evenly items-center grow h-full'>
        <GameArea name={random} update={() => update()} />
        <StatsArea name={random2} scores={scores} update={() => update()} />
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
