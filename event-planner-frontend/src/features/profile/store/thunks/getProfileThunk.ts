import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from 'services/notificationHandlingService';
import UserService from 'services/userService';

const userService = new UserService();

export const getProfileThunk = createAsyncThunk('users/getProfile', async (userId: string, { rejectWithValue }) => {
  try {
    const response = await userService.getUserProfile(userId);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    return rejectWithValue(error.response?.data || 'An error occured while getting the profile.');
  }
});
