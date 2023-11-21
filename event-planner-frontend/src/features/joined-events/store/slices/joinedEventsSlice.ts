import { createSlice } from '@reduxjs/toolkit';
import { Events } from 'features/joined-events/api/dtos';
import { getJoinedEventsThunk } from '../thunks/getJoinedEventsThunk';

type State = {
  loading: boolean;
  error: unknown | null;
  events: Events;
};

const initialState: State = {
  loading: false,
  error: null as unknown,
  events: [],
};

export const joinedEventsSlice = createSlice({
  name: 'joinedEventsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJoinedEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJoinedEventsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getJoinedEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default joinedEventsSlice.reducer;
