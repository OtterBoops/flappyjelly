import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
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
    setRunning: (state, action) => {
      state.running = action.payload;
    },
  },
});

export const { increment, reset, setRunning } = gameSlice.actions;

export default gameSlice.reducer;
