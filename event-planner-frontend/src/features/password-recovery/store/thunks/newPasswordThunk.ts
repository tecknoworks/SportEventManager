import { createAsyncThunk } from '@reduxjs/toolkit';
import { SetNewPasswordDto } from 'features/password-recovery/api/dtos';
import { handleApiError } from 'services/notificationHandlingService';
import UserService from 'services/userService';

const userService = new UserService();

export const newPasswordThunk = createAsyncThunk(
  'users/setNewPassword',
  async (requestData: SetNewPasswordDto, { rejectWithValue }) => {
    try {
      const response = await userService.setNewPassword(requestData);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
