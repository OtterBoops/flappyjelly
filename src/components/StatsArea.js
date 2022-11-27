export default function StatsArea(props) {
  return (
    <aside
      key={props.name}
      className='StatsArea flex flex-col justify-between text-neutral-800 items-left text-center h-full flex-[1 1 0] text-[30px]'>
      <div>
        <span className='font-bold'>Top Local Scores</span>
        {props.scores.map((number) => (
          <p key={number.id}>{number}</p>
        ))}
      </div>

      <button onClick={() => props.reset()}>Reset Scores</button>
    </aside>
  );
}
