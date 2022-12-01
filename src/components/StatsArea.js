export default function StatsArea(props) {
  return (
    <aside
      key={props.name}
      className='StatsArea flex flex-col justify-top text-neutral-800 items-left text-center flex-[1 1 0] text-3xl w-1/3 h-full s:w-11/12'>
      <span className='mb-2'>Top scores</span>
      <div className='flex flex-row justify-center flex-wrap'>
        {props.scores.map((number) => (
          <p
            key={Math.random()}
            className='flex rounded-md justify-center items-center bg-[#f6e1f2] m-3.5 w-[50px]
            h-[50px] p-1 Shadow'>
            {number}
          </p>
        ))}
      </div>

      {/* <button onClick={() => props.reset()}>Reset scores</button> */}
    </aside>
  );
}
