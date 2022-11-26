import Header from './components/Header';
import GameArea from './components/GameArea';
import Footer from './components/Footer';
import StatsArea from './components/StatsArea';

import Clouds from './assets/Background1.jpg';

function App() {
  return (
    <div
      className='App flex flex-col justify-between items-center w-full bg-[#b6eaff] bg-contain bg-no-repeat bg-bottom'
      style={{ backgroundImage: `url(${Clouds})` }}>
      <Header />
      <main className='w-11/12 flex justify-around px-10 items-center'>
        <GameArea />
        <StatsArea />
      </main>
      <Footer />
    </div>
  );
}

export default App;
