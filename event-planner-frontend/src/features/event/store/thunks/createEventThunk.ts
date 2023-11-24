import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEventDto } from 'features/event/api/dtos';
import EventService from 'services/eventService';
import { handleApiError, handleGenericSuccess } from 'services/notificationHandlingService';

const eventService = new EventService();

export const createEventThunk = createAsyncThunk(
  'events/createEvent',
  async (data: CreateEventDto, { rejectWithValue }) => {
    try {
      const response = await eventService.createEvent(data);
      handleGenericSuccess('Event created successfully!');
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while creating the event.');
    }
  }
);
