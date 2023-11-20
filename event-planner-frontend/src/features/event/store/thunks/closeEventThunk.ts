import { createAsyncThunk } from '@reduxjs/toolkit';
import { CloseEventDto } from 'features/event/api/dtos';
import EventService from 'services/eventService';
import { handleApiError, handleGenericSuccess } from 'services/notificationHandlingService';

const eventService = new EventService();

export const closeEventThunk = createAsyncThunk(
  'events/closeEvent',
  async (data: CloseEventDto, { rejectWithValue }) => {
    try {
      const response = await eventService.closeEvent(data);
      handleGenericSuccess('Event closed successfully!');
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while creating the event.');
    }
  }
);
