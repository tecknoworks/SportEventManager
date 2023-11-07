import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';
import { handleApiError } from 'services/notificationHandlingService';

const eventService = new EventService();

export const getPositionsForSportTypeThunk = createAsyncThunk(
  'events/getPositionsForSportTypeThunk',
  async (sportTypeId: string, { rejectWithValue }) => {
    try {
      const response = await eventService.getPositionsForSportType(sportTypeId);
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while creating the event.');
    }
  }
);
