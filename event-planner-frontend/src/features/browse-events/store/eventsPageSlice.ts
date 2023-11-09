import { createSlice } from '@reduxjs/toolkit';
import { EventsResponse } from '../api/dtos';
import { getEventsThunk } from '../thunks/browseEventsThunks';

type State = {
  isLoading: boolean;
  isSuccess: boolean;
  isDone: boolean;
  error: string;
  eventsResponse: EventsResponse;
};

const initialState: State = {
  isLoading: false,
  isSuccess: false,
  isDone: false,
  error: '',
  eventsResponse: {
    totalEvents: 0,
    events: [],
  },
};

const eventsSlice = createSlice({
  name: 'eventsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.eventsResponse = action.payload as EventsResponse;
    });
    builder.addCase(getEventsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default eventsSlice.reducer;
