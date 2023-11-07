import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';
import { handleApiError } from 'services/notificationHandlingService';

const eventService = new EventService();

export const getSportTypesThunk = createAsyncThunk('events/getSportTypes', async (_, { rejectWithValue }) => {
  try {
    const response = await eventService.getSportTypes();
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    return rejectWithValue(error.response?.data || 'An error occured while creating the event.');
  }
});
