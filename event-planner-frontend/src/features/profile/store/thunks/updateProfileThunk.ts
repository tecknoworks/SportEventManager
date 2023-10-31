import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserProfileDto } from 'features/profile/api/dtos';
import { handleApiError } from 'services/notificationHandlingService';
import UserService from 'services/userService';

const userService = new UserService();

export const updateProfileThunk = createAsyncThunk(
  'users/updateProfile',
  async (data: UpdateUserProfileDto, { rejectWithValue }) => {
    try {
      const response = await userService.updateUserProfile(data);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while getting the profile.');
    }
  }
);
