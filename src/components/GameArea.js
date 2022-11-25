import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { increment, reset } from "../redux/gameSlice"

const BIRD_SIZE = 75
const GAME_HEIGHT = 700
const GAME_WIDTH = 450
const GRAVITY = 10
const SPEED = 15
const JUMP_HEIGHT = 100
const OBSTACLE_WIDTH = 50
const OBSTACLE_GAP = BIRD_SIZE * 3

export default function GameArea() {
  const dispatch = useDispatch()

  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2 - BIRD_SIZE / 2)
  const [running, setRunning] = useState(false)
  const [obstacleHeight, setObstacleHight] = useState(350)
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH)

  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight

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
        if (running)
          dispatch(increment())
    }

  }, [running, obstacleLeft, dispatch])

  useEffect(() => {
    const collidedTop = birdPos >= 0 && birdPos < obstacleHeight
    const collidedBot = birdPos <= GAME_HEIGHT && birdPos >= GAME_HEIGHT - bottomObstacleHeight

    if( obstacleLeft >= 0 && obstacleLeft <= OBSTACLE_WIDTH && (collidedBot || collidedTop)) {
      setRunning(false)
      setBirdPos(GAME_HEIGHT / 2 - BIRD_SIZE / 2)
      dispatch(reset())
    }
      
  }, [birdPos, obstacleHeight, bottomObstacleHeight, obstacleLeft, dispatch])

  const handleClick = () => {
    let newBirdPos = birdPos - JUMP_HEIGHT
    if (!running)
      setRunning(true)
    else if (newBirdPos < 0)
      setBirdPos(0)
    else (setBirdPos(newBirdPos))
  }

  return(
    <div
      className="GameArea bg-slate-800 relative overflow-hidden"
      style={{height: GAME_HEIGHT, width: GAME_WIDTH}}
      onClick={handleClick}>
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
    </div>
  )
}

const Bird = (props) => {
  return (
    <div
      className="Bird bg-orange-600 absolute"
      style={{height: BIRD_SIZE, width: BIRD_SIZE, top: props.top}}>
    </div>
  )
}

const Obstacle = (props) => {
  return(
    <div
      className="Pipe bg-red-500 relative"
      style={{top: props.top, height: props.height, width: props.width, left: props.left}}>
    </div>
  )
}