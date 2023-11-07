import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';
import { handleApiError } from 'services/notificationHandlingService';

const eventService = new EventService();

export const getEventThunk = createAsyncThunk('events/getEvent', async (eventId: string, { rejectWithValue }) => {
  try {
    const response = await eventService.getEventById(eventId);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    return rejectWithValue(error.response?.data || 'An error occured while getting the event.');
  }
});
