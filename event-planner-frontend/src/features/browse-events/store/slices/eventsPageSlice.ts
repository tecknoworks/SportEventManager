import { createSlice } from '@reduxjs/toolkit';
import { EventsResponse } from '../../api/dtos';
import { getEventsThunk } from '../../thunks/browseEventsThunks';
import { joinEventThunk } from 'features/browse-events/thunks/joinEventsThunk';
import { changeUserStatusThunk } from 'features/event-users/thunks/changeUserStatusThunk';
import { deleteParticipantThunk } from 'features/event-users/thunks/deleteParticipantThunk';

type State = {
  isLoading: boolean;
  isSuccess: boolean;
  isDeleteSuccess: boolean;
  isDone: boolean;
  error: string;
  eventsResponse: EventsResponse;
};

const initialState: State = {
  isLoading: false,
  isSuccess: false,
  isDeleteSuccess: false,
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
    builder.addCase(joinEventThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(joinEventThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDone = true;
    });
    builder.addCase(joinEventThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDone = true;
      state.error = action.payload as string;
    });
    builder.addCase(changeUserStatusThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeUserStatusThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(changeUserStatusThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteParticipantThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteParticipantThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isDeleteSuccess = true;
    });
    builder.addCase(deleteParticipantThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default eventsSlice.reducer;
