import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserProfileDto } from 'features/profile/api/dtos';
import { handleApiError } from 'services/notificationHandlingService';
import UserService from 'services/userService';

const userService = new UserService();

type Params = {
  userId: string;
  data: UpdateUserProfileDto;
};

export const updateProfileThunk = createAsyncThunk(
  'users/updateProfile',
  async (params: Params, { rejectWithValue }) => {
    try {
      const response = await userService.updateUserProfile(params.userId, params.data);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occurred while updating the profile.');
    }
  }
);
