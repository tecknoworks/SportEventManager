import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterParams } from '../api/dtos';
import EventService from 'services/eventService';

const eventService: EventService = new EventService();

export const getEventsThunk = createAsyncThunk(
  'post/getEvents',
  async (filterParams: FilterParams, { rejectWithValue }) => {
    try {
      const res = await eventService.getEvents(filterParams);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error occured');
    }
  }
);
