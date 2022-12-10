import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    lastScore: 0,
    running: false,
    gameOver: false,
    easyMode: false,
    flipped: false,
    muted: false,
    bigMayo: false,
    hardMode: false,
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
    setEasyMode: (state, action) => {
      state.easyMode = action.payload;
    },
    toggleFlip: (state) => {
      state.flipped = true;
    },
    toggleMute: (state) => {
      state.muted = !state.muted;
    },
    setBigMayo: (state) => {
      state.bigMayo = true;
    },
    setHardMode: (state) => {
      state.hardMode = !state.hardMode;
    },
  },
});

export const {
  increment,
  reset,
  setRunning,
  setGameOver,
  setLastScore,
  setEasyMode,
  toggleFlip,
  toggleMute,
  setBigMayo,
  setHardMode,
} = gameSlice.actions;

export default gameSlice.reducer;
