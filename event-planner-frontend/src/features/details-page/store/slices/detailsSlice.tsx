import { createSlice } from "@reduxjs/toolkit";
import { getEventThunk } from "features/event/store/thunks/getEventThunk";
import { EventDetails } from "../api/dtos";

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
