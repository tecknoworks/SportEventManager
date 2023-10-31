import { createAsyncThunk } from '@reduxjs/toolkit';
import { SendResetLinkDto } from 'features/password-recovery/api/dtos';
import { handleApiError } from 'services/notificationHandlingService';
import UserService from 'services/userService';

const userService = new UserService();

export const resetLinkThunk = createAsyncThunk(
  'users/resetLink',
  async (requestData: SendResetLinkDto, { rejectWithValue }) => {
    try {
      const response = await userService.sendResetLink(requestData);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
