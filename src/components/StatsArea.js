import { useEffect, useState } from 'react';

export default function StatsArea() {
  const [key, setKey] = useState(0);
  let scores = JSON.parse(localStorage.getItem('scores'));

  const resetScore = () => {
    localStorage.setItem('scores', JSON.stringify([]));
    setKey(Math.random());
  };

  useEffect(() => {
    setInterval(() => {
      scores = JSON.parse(localStorage.getItem('scores'));
      setKey(Math.random());
    }, 24);
  }, []);

  return (
    <aside
      key={key}
      className='StatsArea flex flex-col justify-between text-neutral-800 items-left text-center h-full w-[400px] text-[30px]'>
      <div>
        <span className='font-bold'>Top Local Scores</span>
        {scores.map((number) => (
          <p key={number.id}>{number}</p>
        ))}
      </div>

      <button onClick={() => resetScore()}>Reset Scores</button>
    </aside>
  );
}
