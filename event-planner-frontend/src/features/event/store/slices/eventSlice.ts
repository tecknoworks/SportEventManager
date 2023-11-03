import { createSlice } from '@reduxjs/toolkit';
import { createEventThunk } from '../thunks/createEventThunk';

type State = {
  isLoading: boolean;
  isSuccess: boolean;
  isDone: boolean;
  error: string;
};

const initialState: State = {
  isLoading: false,
  isSuccess: false,
  isDone: false,
  error: '',
};

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEventThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createEventThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDone = true;
    });

    builder.addCase(createEventThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
  },
});

export default eventSlice.reducer;
