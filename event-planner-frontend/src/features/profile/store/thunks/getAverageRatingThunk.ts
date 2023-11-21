import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "services/notificationHandlingService";
import UserService from "services/userService";

const userService = new UserService();

export const getAverageRatingThunk = createAsyncThunk('user/getAverageRating', async (userId: string, { rejectWithValue }) => {
    try {
        const response = await userService.getUserRating(userId);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occured while getting the rating for the user.');
    }

})