import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';
import { handleApiError, handleGenericSuccess } from 'services/notificationHandlingService';
import { SendReviewData } from '../api/dto';

const eventService = new EventService();

export const sendReviewThunk = createAsyncThunk(
  'eventsSlice/sendReview',
  async (data: SendReviewData, { rejectWithValue }) => {
    try {
      const response = await eventService.sendReview(data);
      handleGenericSuccess('Review posted successfully!');
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'An error occured while creating the event.');
    }
  }
);
