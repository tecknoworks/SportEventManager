import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';
import { ChangeStatusDto } from '../api/dtos';

const eventService: EventService = new EventService();

export const changeUserStatusThunk = createAsyncThunk(
  'eventsSlice/changeUserStatus',
  async (data: ChangeStatusDto, { rejectWithValue }) => {
    try {
      const res = await eventService.changeUserStatus(data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error occured');
    }
  }
);
