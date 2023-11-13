import { createSlice } from '@reduxjs/toolkit';
import { EventsResponse } from '../../api/dtos';
import { getEventsThunk } from '../../thunks/browseEventsThunks';

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

const joinEventSlice = createSlice({
  name: 'joinEventSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventsThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDone = true;
    });
    builder.addCase(getEventsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
  },
});

export default joinEventSlice.reducer;
