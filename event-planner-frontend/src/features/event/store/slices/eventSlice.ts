import { createSlice } from '@reduxjs/toolkit';
import { getSportTypesThunk } from '../thunks/getSportTypesThunk';
import { GetEventDto, GetPositionForSportTypeDto, GetSportTypesDto } from 'features/event/api/dtos';
import { getPositionsForSportTypeThunk } from '../thunks/getPositionsForSportTypeThunk';
import { getEventThunk } from '../thunks/getEventThunk';
import { closeEventThunk } from '../thunks/closeEventThunk';
import { sendReviewThunk } from 'features/review-event/thunks/sendReviewThunk';
import { updateEventThunk } from '../thunks/updateEventThunk';

type State = {
  sportTypes: GetSportTypesDto[] | undefined;
  positions: GetPositionForSportTypeDto[] | undefined;
  currentEvent: GetEventDto | undefined;
  closeSuccess: boolean;
  sendSuccess: boolean;
};

const initialState: State = {
  sportTypes: undefined,
  positions: undefined,
  currentEvent: undefined,
  closeSuccess: false,
  sendSuccess: false,
};

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSportTypesThunk.fulfilled, (state, action) => {
      state.sportTypes = action.payload as GetSportTypesDto[];
    });

    builder.addCase(getPositionsForSportTypeThunk.fulfilled, (state, action) => {
      state.positions = action.payload as GetPositionForSportTypeDto[];
    });

    builder.addCase(getEventThunk.fulfilled, (state, action) => {
      state.currentEvent = action.payload as GetEventDto;
    });

    builder.addCase(closeEventThunk.fulfilled, (state) => {
      state.closeSuccess = true;
    });

    builder.addCase(sendReviewThunk.fulfilled, (state) => {
      state.sendSuccess = true;
    });
  },
});

export default eventSlice.reducer;
