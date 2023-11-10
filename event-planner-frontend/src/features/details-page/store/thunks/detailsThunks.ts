import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import EventService from 'services/eventService';

const eventService = new EventService();


export const detailsPage = createAsyncThunk('', async () => {
    try {

    } catch (error: any) {

    }
});
