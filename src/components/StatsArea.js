import { useDispatch } from 'react-redux';
import { setEasyMode } from '../redux/gameSlice';

export default function StatsArea(props) {
  const dispatch = useDispatch();

  return (
    <aside
      key={props.name}
      className='StatsArea flex flex-col text-neutral-800 text-center text-3xl w-1/3 h-full s:w-11/12 justify-evenly'>
      <div>
        <span className=''>Top scores</span>
        <div className='flex flex-row justify-center flex-wrap'>
          {props.scores.map((number) => (
            <p
              key={Math.random()}
              className='flex rounded-md justify-center items-center bg-jellyPink m-3.5 w-[50px]
            h-[50px] p-1 Shadow'>
              {number}
            </p>
          ))}
        </div>
      </div>

      <button
        className='bg-jellyPink rounded-lg p-2 text-xl Shadow'
        onClick={() => dispatch(setEasyMode(true))}>
        I am a big baby and the game is too hard
      </button>
    </aside>
  );
}
