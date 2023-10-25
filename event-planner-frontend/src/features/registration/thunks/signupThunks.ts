import { createAsyncThunk } from '@reduxjs/toolkit';
import CommonService from 'services/commonServices';
import { UserDto } from '../api/Dtos';

const service: CommonService = new CommonService();

export const createUser = createAsyncThunk(
  'post/createUser',
  async (initialUser: UserDto) => {
    const res = await service.post('/createUser', initialUser);
    return res.data;
  }
);
