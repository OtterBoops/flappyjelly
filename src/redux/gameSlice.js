import { createSlice } from "@reduxjs/toolkit"

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    score: 0,
    running: false
  },
  reducers: {
    increment: (state) => {
      state.score +=1
    },
    reset: (state) => {
      state.score = 0
    },
    running: (state, running) => {
      state.running = running
    }
  }
})

export const { increment, reset, running} = gameSlice.actions

export default gameSlice.reducer