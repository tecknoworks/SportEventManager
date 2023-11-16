import { createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';
import { DeleteParticipantDto } from '../api/dtos';
import { handleGenericSuccess, handleApiError } from 'services/notificationHandlingService';

const eventService: EventService = new EventService();

export const deleteParticipantThunk = createAsyncThunk(
  'eventsSlice/deleteParticipant',
  async (data: DeleteParticipantDto, { rejectWithValue }) => {
    try {
      const res = await eventService.deleteParticipant(data);
      handleGenericSuccess('You have successfully deleted an user!');
      return res.data;
    } catch (error: any) {
      handleApiError(error);
      return rejectWithValue(error.response?.data || 'Error occured');
    }
  }
);
