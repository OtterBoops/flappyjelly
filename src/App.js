import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGameOver } from './redux/gameSlice';

import Header from './components/Header';
import GameArea from './components/GameArea';
import Footer from './components/Footer';
import StatsArea from './components/StatsArea';
import What from './components/What';

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
      <main className='w-11/12 flex justify-between px-10 items-center'>
        <StatsArea
          name={random}
          scores={scores}
          reset={() => resetScores()}
          update={() => update()}
        />
        <GameArea update={() => update()} />
        <What />
      </main>
      <Footer />
    </div>
  );
}

export default App;
