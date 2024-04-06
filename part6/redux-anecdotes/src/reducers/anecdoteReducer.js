import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    votes(state, action) {
      const id = action.payload;
      const index = state.findIndex((anecdote) => anecdote.id === id);
      state[index].votes += 1;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, votes, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
