import { createSlice } from "@reduxjs/toolkit";
import { getEventThunk } from "features/event/store/thunks/getEventThunk";

type EventPosition = {
    availablePositions?: number | null;
    eventId?: string | null;
    positionId?: string | null;
    positionName?: string | null;
};

type Participant = {
    eventPositionId?: string | null;
    positionName?: string | null;
    statusId?: string | null;
    statusName?: string | null;
    userId?: string | null;
    userName?: string | null;
};

type EventDetails = {
    authorUserId?: string | null;
    authorUserName?: string | null;
    description?: string | null;
    endDate?: string | null;
    eventPositions?: EventPosition[] | null;
    hasPositions?: boolean | null;
    id?: string | null;
    isClosed?: boolean | null;
    location?: string | null;
    locationName?: string | null;
    maximumParticipants?: number | null;
    name?: string | null;
    participants?: Participant[] | null;
    skillLevel?: number | null;
    sportTypeId?: string | null;
    sportTypeName?: string | null;
    startDate?: string | null;
};


const initialState = {
    eventDetails: {} as EventDetails,
    loading: false,
    error: null as unknown,
};

export const detailsSlice = createSlice({
    name: 'detailsPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEventThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEventThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.eventDetails = action.payload;
                state.error = null;
            })
            .addCase(getEventThunk.rejected, (state, action) => {
                state.loading = false;
                state.eventDetails = {};
                state.error = action.payload;
            });
    },
});

export default detailsSlice.reducer;
