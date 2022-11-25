import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { increment, reset, setRunning } from "../redux/gameSlice"

import Duck from "../assets/Duck.png"

import Bitch from "../assets/Bitch.wav"
import Quack1 from "../assets/Quack1.wav"
import Quack2 from "../assets/Quack2.wav"
import Quack3 from "../assets/Quack3.wav"
import Quack4 from "../assets/Quack4.wav"
import Quack5 from "../assets/Quack5.wav"
import Quack6 from "../assets/Quack6.wav"
import Quack7 from "../assets/Quack7.wav"

const BIRD_SIZE = 75
const GAME_HEIGHT = 700
const GAME_WIDTH = 450
const GRAVITY = 10
const SPEED = 10
const JUMP_HEIGHT = 100
const OBSTACLE_WIDTH = 50
const OBSTACLE_GAP = BIRD_SIZE * 3

export default function GameArea() {
  const dispatch = useDispatch()

  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2 - BIRD_SIZE / 2)
  const [obstacleHeight, setObstacleHight] = useState(350)
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH)
  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight
  const Quacks =[Quack1, Quack2, Quack3, Quack4, Quack5, Quack6, Quack7]

  const running = useSelector((state) => state.game.running)

  useEffect(() => {
    let timeId

    if(running && birdPos < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPos((birdPos) => birdPos + GRAVITY)
      }, 24);
    }

    return () => {
      clearInterval(timeId)
    }
  }, [birdPos, running])

  useEffect(() => {
    let obstacleId

    if (running && obstacleLeft >= - OBSTACLE_WIDTH){
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - SPEED)
      }, 24);
      
      return () => {
        clearInterval(obstacleId)
      }
    }

    else {
        setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH)
        setObstacleHight(Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)))
        // setObstacleHight(425)
        if (running)
          dispatch(increment())
    }

  }, [obstacleLeft, dispatch, running])

  useEffect(() => {
    const collidedTop = birdPos >= 0 && birdPos < obstacleHeight
    const collidedBot = birdPos <= GAME_HEIGHT && birdPos >= GAME_HEIGHT - bottomObstacleHeight - BIRD_SIZE

    if( obstacleLeft >= 0 && obstacleLeft <= OBSTACLE_WIDTH && (collidedBot || collidedTop)) {
      let bitch = new Audio(Bitch)
      bitch.play()
      dispatch(setRunning(false))
      setBirdPos(GAME_HEIGHT / 2 - BIRD_SIZE / 2)
      dispatch(reset())
    }
      
  }, [birdPos, obstacleHeight, bottomObstacleHeight, obstacleLeft, dispatch])

  const handleClick = () => {
    let newBirdPos = birdPos - JUMP_HEIGHT

    let quack = new Audio(Quacks[Math.floor(Math.random()* 6)])
    quack.play()

    if (!running)
      dispatch(setRunning(true))
    else if (newBirdPos < 0)
      setBirdPos(0)
    else (setBirdPos(newBirdPos))
  }

  return(
    <div
      className="GameArea bg-slate-800 relative overflow-hidden"
      style={{height: GAME_HEIGHT, width: GAME_WIDTH}}
      onClick={handleClick}>
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
  )
}

const Bird = (props) => {
  return (
    <div
      className={`Bird bg-contain absolute z-10`}
      style={{height: BIRD_SIZE, width: BIRD_SIZE, top: props.top, backgroundImage: `url(${Duck})`}}>
    </div>
  )
}

const Obstacle = (props) => {
  return(
    <div
      className={`Pipe bg-red-500 relative z-10`}
      style={{top: props.top, height: props.height, width: props.width, left: props.left}}>
    </div>
  )
}

const Sky = () => {
  return(
    <div
      className="Sky absolute bg-gradient-to-b from-sky-600 to-sky-300  h-4/5 w-full">
    </div>
  )
}

const Ground = () => {
  return (
    <div className="Ground bottom-0 absolute bg-lime-600 h-1/5 w-full">
    </div>
  )
}