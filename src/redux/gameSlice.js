import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    lastScore: 0,
    running: false,
    gameOver: false,
  },
  reducers: {
    increment: (state) => {
      state.score += 1;
    },
    reset: (state) => {
      state.score = 0;
    },
    setLastScore: (state, action) => {
      state.lastScore = action.payload;
    },
    setRunning: (state, action) => {
      state.running = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
  },
});

export const { increment, reset, setRunning, setGameOver, setLastScore } =
  gameSlice.actions;

export default gameSlice.reducer;
