import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateEventDto } from 'features/event/api/dtos';
import EventService from 'services/eventService';
import { handleApiError, handleGenericSuccess } from 'services/notificationHandlingService';

const eventService = new EventService();

type Params = {
  eventId: string;
  data: UpdateEventDto;
};

export const updateEventThunk = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, data }: Params, { rejectWithValue }) => {
    try {
      const response = await eventService.updateEvent(eventId, data);
      handleGenericSuccess('Event updated successfully!');
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while creating the event.');
    }
  }
);
