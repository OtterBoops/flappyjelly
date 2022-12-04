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
import GameBg from '../assets/GameBg.png';
import ShitYourselfDog from '../assets/ShitYourself.png';
import Mayo from '../assets/MayoJar.png';

//Sound Imports
import Bitch from '../assets/Bitch.wav';
import Quack1 from '../assets/Quack1.wav';
import Quack2 from '../assets/Quack2.wav';
import Quack3 from '../assets/Quack3.wav';
import Quack4 from '../assets/Quack4.wav';
import Quack5 from '../assets/Quack5.wav';
import Quack6 from '../assets/Quack6.wav';
import Quack7 from '../assets/Quack7.wav';
import MayoSound from '../assets/Mayo.wav';

//Constants
const BIRD_SIZE = 60;
const GAME_HEIGHT = 600;
const GAME_WIDTH = 350;
const GRAVITY = 5;
const SPEED = 5;
const GAME_TICK = 12;
const JUMP_HEIGHT = 100;
const OBSTACLE_WIDTH = 40;
const HIGHSCORE_AMOUNT = 3;

export default function GameArea(props) {
  var OBSTACLE_GAP = useSelector((state) => state.game.easyMode)
    ? BIRD_SIZE * 8
    : BIRD_SIZE * 3.5;

  //Local State
  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
  const [obstacleHeight, setObstacleHight] = useState(350);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
  const [inverted, setInverted] = useState(false);

  //Redux State
  const dispatch = useDispatch();
  const running = useSelector((state) => state.game.running);
  const gameOver = useSelector((state) => state.game.gameOver);
  const currentScore = useSelector((state) => state.game.score);
  const muted = useSelector((state) => state.game.muted);

  //Other Consts
  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight;
  const Quacks = [Quack1, Quack2, Quack3, Quack4, Quack5, Quack6, Quack7];
  let scores = JSON.parse(localStorage.getItem('scores'));
  let easyMode = useSelector((state) => state.game.easyMode);

  useEffect(() => {
    let timeId;

    if (running) {
      dispatch(setGameOver(false));

      timeId = setInterval(() => {
        if (!inverted) setBirdPos((birdPos) => birdPos + GRAVITY);
        else setBirdPos((birdPos) => birdPos - GRAVITY * 4);
      }, GAME_TICK);
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
      }, GAME_TICK);

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
    const collidedGround = birdPos >= GAME_HEIGHT - BIRD_SIZE;
    let bitch = new Audio(Bitch);
    let mayo = new Audio(MayoSound);

    if (
      (obstacleLeft >= 0 &&
        obstacleLeft <= OBSTACLE_WIDTH &&
        (collidedBot || collidedTop)) ||
      collidedGround
    ) {
      if (!muted) {
        mayo.play();
        setTimeout(() => {
          bitch.play();
        }, 500);
      }

      dispatch(setLastScore(currentScore));
      dispatch(setRunning(false));
      dispatch(setGameOver(true));
      dispatch(reset());

      if (!easyMode) {
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
      if (!muted) quack.play();
      if (!running) dispatch(setRunning(true));
      else if (newBirdPos < 0) setBirdPos(0);
      else {
        setInverted(true);
        setTimeout(() => {
          setInverted(false);
        }, GAME_TICK * 6);
      }
    }
  };

  return (
    <div className='GameBox bg-jellyPink p-4 rounded-lg Shadow mb-5 border-2'>
      <div
        className='GameArea relative overflow-hidden rounded-lg'
        style={{ height: GAME_HEIGHT, width: GAME_WIDTH }}
        onClick={handleClick}>
        {gameOver && <GameOver />}
        {running && <ScoreDisplay />}
        {!gameOver && <Sky />}
        {!gameOver && (
          <Obstacle
            top={0}
            height={obstacleHeight}
            width={OBSTACLE_WIDTH}
            left={obstacleLeft}
          />
        )}

        {!gameOver && <Bird top={birdPos} />}

        {!gameOver && (
          <Obstacle
            top={GAME_HEIGHT - obstacleHeight - bottomObstacleHeight}
            height={bottomObstacleHeight}
            width={OBSTACLE_WIDTH}
            left={obstacleLeft}
          />
        )}
        {!gameOver && <ShitYourself />}
      </div>
    </div>
  );
}

const ScoreDisplay = () => {
  const currentScore = useSelector((state) => state.game.score);

  return (
    <div className='GameScore absolute text-center z-10 mt-10 text-[40px] text-neutral-800 font-bold select-none w-full flex items-center justify-center'>
      <p className='bg-jellyPink h-12 w-12 p-0 m-0 flex justify-center items-center Shadow rounded-lg'>
        {currentScore}
      </p>
    </div>
  );
};

const Bird = (props) => {
  return (
    <div
      className='Bird bg-contain absolute z-10 select-none'
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
      draggable={false}
      className={
        'Pipe relative z-10 bg-bottom bg-repeat-y bg-contain select-none'
      }
      style={{
        top: props.top,
        height: props.height,
        width: props.width,
        left: props.left,
        backgroundImage: `url(${Mayo})`,
      }}></div>
  );
};

const Sky = () => {
  const running = useSelector((state) => state.game.running);
  const gameOver = useSelector((state) => state.game.gameOver);
  const score = useSelector((state) => state.game.score);

  let click = !running && !gameOver;

  return (
    <div
      className='Sky absolute bg-gradient-to-b from-sky-600 to-sky-300 h-full w-full flex justify-center items-center flex-col select-none text-neutral-800 font-bold text-[40px]'
      style={{ backgroundImage: `url(${GameBg})` }}>
      <img
        src={`${ShitYourselfDog}`}
        alt=''
        className='aspect-square mix-blend-overlay max-h-32'
        style={{ opacity: `${Math.min(score / 200, 1)}` }}
        draggable={false}
      />
      {click && <p>Click To Start</p>}
    </div>
  );
};

const ShitYourself = () => {
  return (
    <div className='Ground bottom-0 absolute h-1/5 w-full select-none flex justify-center'></div>
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
    <div className='GameOver absolute flex flex-col justify-evenly items-center text-neutral-800 text-[40px] h-full w-full bg-transparent z-20 select-none'>
      <p className='font-bold'>{lastScore}</p>
      <p>{insults[Math.floor(Math.random() * insults.length)]}</p>
      <button
        className='flex justify-center items-center rounded-[40px] py-2 px-4 border-[#eee] border-2 drop-shadow-lg bg-[#95c3e6] active:shadow-inner active:drop-shadow-none'
        onClick={() => dispatch(setGameOver(false))}>
        Play Again?
      </button>
    </div>
  );
};
