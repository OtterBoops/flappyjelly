var isFirefox = typeof InstallTrigger !== 'undefined';

export default function Header() {
  return (
    <div className='flex justify-center flex-col items-center bg-jellyPink p-4 rounded-lg my-5 w-11/12 Shadow text-xl s:text-center'>
      <p className='font-bold'>Flappy Jelly</p>
      <p>When she quacks, she jumps and when she jumps she quacks.</p>
      {isFirefox && (
        <p className='text-red-500 text-lg font-bold'>
          Flappy Jelly runs like shit on Firefox. Use Chrome/Opera &lt;3
        </p>
      )}
    </div>
  );
}
