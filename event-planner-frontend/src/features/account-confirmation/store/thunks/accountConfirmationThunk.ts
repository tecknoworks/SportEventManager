import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConfirmEmailDto } from 'features/account-confirmation/api/dtos';
import UserService from 'services/userService';

const userService = new UserService();

export const accountConfirmationThunk = createAsyncThunk(
  'users/confirmEmail',
  async (requestData: ConfirmEmailDto, { rejectWithValue }) => {
    try {
      const response = await userService.confirmEmail(requestData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
