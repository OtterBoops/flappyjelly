export default function StatsArea(props) {
  return (
    <aside
      key={props.name}
      className='StatsArea flex justify-center text-neutral-800 items-left text-center flex-[1 1 0] text-[30px] w-full'>
      <div className='flex flex-col w-full'>
        <span className='font-bold bg-[#f6e1f2] rounded-md normal-shadow'>
          Top Local Scores
        </span>
        <div className='flex flex-row justify-start '>
          {props.scores.map((number) => (
            <p
              key={Math.random()}
              className='flex w-1/12 rounded-md justify-center items-center bg-[#f6e1f2] m-4 normal-shadow'>
              {number}
            </p>
          ))}
        </div>
      </div>

      {/* <button onClick={() => props.reset()}>Reset Scores</button> */}
    </aside>
  );
}
