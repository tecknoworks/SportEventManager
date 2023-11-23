import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlockUserDto } from "features/admin-management/api/dtos";
import { handleApiError } from "services/notificationHandlingService";
import UserService from "services/userService";

const userService: UserService = new UserService();

export const blockUserThunk = createAsyncThunk('adminSlice/blockUser', async (requestData: BlockUserDto, thunkAPI) => {
    try {
        const response = await userService.blockUser(requestData)
        return response.data
    } catch (error: any) {
        handleApiError(error);
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
})