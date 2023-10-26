import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import UserServices from 'services/userServices';
import { UserDto } from '../api/Dtos';

const userService: UserServices = new UserServices();

export const resetStore_name = 'reset';
export const resetStore = createAction(resetStore_name);

export const createUser = createAsyncThunk(
  'post/createUser',
  async (initialUser: UserDto, { rejectWithValue }) => {
    try {
      const res = await userService.createUser(initialUser);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error occured');
    }
  }
);
