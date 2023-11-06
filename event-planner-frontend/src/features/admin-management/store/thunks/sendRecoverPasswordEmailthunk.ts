import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendResetLinkDto } from "features/password-recovery/api/dtos";
import { handleApiError } from "services/notificationHandlingService";
import UserService from 'services/userService';

const userService = new UserService();

export const sendRecoverPasswordEmailThunk = createAsyncThunk('adminSlice/sendRecoverPasswordEmail', async (requestData: SendResetLinkDto, thunkAPI) => {
    try {
        const response = await userService.sendRecoverPasswordEmail(requestData)
        return response.data;
    } catch (error: any) {
        handleApiError(error);
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
})