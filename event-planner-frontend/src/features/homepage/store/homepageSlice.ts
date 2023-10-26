import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState = { value: 0 } as CounterState;

const homepageSlice = createSlice({
  name: 'homepageSlice',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
  },
});

export const { increment } = homepageSlice.actions;
export default homepageSlice.reducer;
