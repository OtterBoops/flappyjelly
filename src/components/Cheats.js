export default function Cheats(props) {
  const handleSubmit = (event) => {
    event.preventDefault();

    switch (event.target[0].value.toLowerCase()) {
      case 'reset':
        props.reset();
        break;

      case 'flip':
        props.flip();
        break;

      case 'mute':
        props.mute();
        break;

      case 'bigmayo':
        props.bigMayo();
        break;
      case 'hard':
        console.log('hardmode on');
        props.hardMode();
        break;

      default:
        break;
    }

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='mb-3 border-4 border-jellyPink rounded-full text-2xl text-center focus:outline-none'
        type='text'
        placeholder='Cheats'
      />
    </form>
  );
}
