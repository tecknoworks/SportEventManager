import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserOrAdminDto } from "features/admin-management/api/dtos";
import UserService from "services/userService";

const userService: UserService = new UserService();

export const createUserOrAdminThunk = createAsyncThunk("adminSlice/createUserOrAdmin", async (requestData: UserOrAdminDto, thunkAPI) => {
    try {
        const request = await userService.createUserOrAdmin(requestData);
        return request.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})