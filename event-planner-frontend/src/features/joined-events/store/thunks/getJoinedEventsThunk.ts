import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from 'services/notificationHandlingService';
import UserService from 'services/userService';

const userService = new UserService();

export const getJoinedEventsThunk = createAsyncThunk('user/getJoinedEvents', async (userId: string, thunkAPI) => {
  try {
    const response = await userService.getAllJoinedEventsOfaUser(userId);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    return thunkAPI.rejectWithValue(error.response?.data || 'An error occured while getting the profile.');
  }
});
