/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  reset,
  setRunning,
  setGameOver,
  setLastScore,
} from '../redux/gameSlice';

//Image Imports
import Duck from '../assets/Duck.png';

//Sound Imports
import Bitch from '../assets/Bitch.wav';
import Quack1 from '../assets/Quack1.wav';
import Quack2 from '../assets/Quack2.wav';
import Quack3 from '../assets/Quack3.wav';
import Quack4 from '../assets/Quack4.wav';
import Quack5 from '../assets/Quack5.wav';
import Quack6 from '../assets/Quack6.wav';
import Quack7 from '../assets/Quack7.wav';

//Constants
const BIRD_SIZE = 75;
const GAME_HEIGHT = 700;
const GAME_WIDTH = 450;
const GRAVITY = 10;
const SPEED = 10;
const JUMP_HEIGHT = 100;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_GAP = BIRD_SIZE * 3;
const HIGHSCORE_AMOUNT = 10;

export default function GameArea(props) {
  //Local State
  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
  const [obstacleHeight, setObstacleHight] = useState(350);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);

  //Redux State
  const dispatch = useDispatch();
  const running = useSelector((state) => state.game.running);
  const gameOver = useSelector((state) => state.game.gameOver);
  const currentScore = useSelector((state) => state.game.score);

  //Other Consts
  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight;
  const Quacks = [Quack1, Quack2, Quack3, Quack4, Quack5, Quack6, Quack7];
  let scores = JSON.parse(localStorage.getItem('scores'));

  useEffect(() => {
    let timeId;

    if (running && birdPos < GAME_HEIGHT - BIRD_SIZE) {
      dispatch(setGameOver(false));
      timeId = setInterval(() => {
        setBirdPos((birdPos) => birdPos + GRAVITY);
      }, 24);
    }

    return () => {
      clearInterval(timeId);
    };
  }, [birdPos, running]);

  useEffect(() => {
    let obstacleId;

    if (running && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - SPEED);
      }, 24);

      return () => {
        clearInterval(obstacleId);
      };
    } else {
      setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
      setObstacleHight(
        Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP))
      );

      if (running) dispatch(increment());
    }
  }, [obstacleLeft, dispatch, running]);

  useEffect(() => {
    const collidedTop = birdPos >= 0 && birdPos < obstacleHeight;
    const collidedBot =
      birdPos <= GAME_HEIGHT &&
      birdPos >= GAME_HEIGHT - bottomObstacleHeight - BIRD_SIZE;

    if (
      obstacleLeft >= 0 &&
      obstacleLeft <= OBSTACLE_WIDTH &&
      (collidedBot || collidedTop)
    ) {
      let bitch = new Audio(Bitch);

      bitch.play();

      dispatch(setLastScore(currentScore));
      dispatch(setRunning(false));
      dispatch(setGameOver(true));
      dispatch(reset());

      if (scores.length < HIGHSCORE_AMOUNT) {
        scores.push(currentScore);
        scores.sort((a, b) => {
          return b - a;
        });
      } else if (
        scores.length === HIGHSCORE_AMOUNT &&
        scores[scores.length - 1] < currentScore
      ) {
        scores[scores.length - 1] = currentScore;
        scores.sort((a, b) => {
          return b - a;
        });
      }

      localStorage.setItem('scores', JSON.stringify(scores));

      setBirdPos(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
      props.update();
    }
  }, [birdPos, obstacleHeight, bottomObstacleHeight, obstacleLeft, dispatch]);

  const handleClick = () => {
    let newBirdPos = birdPos - JUMP_HEIGHT;
    let quack = new Audio(Quacks[Math.floor(Math.random() * Quacks.length)]);

    if (!gameOver) {
      quack.play();
      if (!running) dispatch(setRunning(true));
      else if (newBirdPos < 0) setBirdPos(0);
      else setBirdPos(newBirdPos);
    }
  };

  return (
    <div className='GameBox bg-[#e2cbdd] p-4 rounded-lg inset-shadow'>
      <div
        className='GameArea relative overflow-hidden rounded-lg'
        style={{ height: GAME_HEIGHT, width: GAME_WIDTH }}
        onClick={handleClick}>
        {gameOver && <GameOver />}
        {running && <ScoreDisplay />}
        <Sky />
        <Obstacle
          top={0}
          height={obstacleHeight}
          width={OBSTACLE_WIDTH}
          left={obstacleLeft}
        />

        <Bird top={birdPos} />

        <Obstacle
          top={GAME_HEIGHT - obstacleHeight - bottomObstacleHeight}
          height={bottomObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={obstacleLeft}
        />
        <Ground />
      </div>
    </div>
  );
}

const ScoreDisplay = () => {
  const currentScore = useSelector((state) => state.game.score);

  return (
    <div className='GameScore absolute w-full text-center z-10 mt-10 text-[40px] text-neutral-100 font-bold'>
      {currentScore}
    </div>
  );
};

const Bird = (props) => {
  return (
    <div
      className={'Bird bg-contain absolute z-10'}
      style={{
        height: BIRD_SIZE,
        width: BIRD_SIZE,
        top: props.top,
        backgroundImage: `url(${Duck})`,
      }}></div>
  );
};

const Obstacle = (props) => {
  return (
    <div
      className={`Pipe bg-red-500 relative z-10`}
      style={{
        top: props.top,
        height: props.height,
        width: props.width,
        left: props.left,
      }}></div>
  );
};

const Sky = () => {
  const running = useSelector((state) => state.game.running);
  const gameOver = useSelector((state) => state.game.gameOver);

  let click = !running && !gameOver;

  return (
    <div className='Sky absolute bg-gradient-to-b from-sky-600 to-sky-300 h-4/5 w-full flex justify-center items-center select-none text-neutral-100 text-[40px]'>
      {click && <p>Click To Start</p>}
    </div>
  );
};

const Ground = () => {
  return (
    <div className='Ground bottom-0 absolute bg-gradient-to-b from-lime-600 to-lime-800 h-1/5 w-full'></div>
  );
};

const GameOver = () => {
  let insults = [
    'You Suck',
    'Git Gud',
    'Skill Issue',
    'Short + L',
    'Get Owned',
    'Learn to Play',
    'Stinky',
    'Stop Playing',
  ];

  const lastScore = useSelector((state) => state.game.lastScore);
  const dispatch = useDispatch();

  return (
    <div className='GameOver absolute flex flex-col justify-evenly items-center text-neutral-800 text-[40px] h-full w-full bg-[#e2cbdd] z-20 select-none'>
      <p className='font-bold'>{lastScore}</p>
      <p>{insults[Math.floor(Math.random() * insults.length)]}</p>
      <button
        className='flex justify-center items-center border rounded p-1'
        onClick={() => dispatch(setGameOver(false))}>
        Play Again?
      </button>
    </div>
  );
};
