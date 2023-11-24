import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';
import { JoinEventDto } from '../api/dtos';
import { handleApiError, handleGenericSuccess } from 'services/notificationHandlingService';

const eventService: EventService = new EventService();

export const joinEventThunk = createAsyncThunk(
  'eventsSlice/joinEvent',
  async (data: JoinEventDto, { rejectWithValue }) => {
    try {
      const res = await eventService.joinEvent(data);
      handleGenericSuccess('You have successfully joined the event!');
      return res.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'Error occured');
    }
  }
);
