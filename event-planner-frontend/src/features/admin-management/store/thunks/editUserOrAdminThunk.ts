import { createAsyncThunk } from "@reduxjs/toolkit";
import { EditUserOrAdminDto } from "features/admin-management/api/dtos";
import UserService from "services/userService";

const userService: UserService = new UserService();

export const editUserOrAdminThunk = createAsyncThunk("adminSlice/editUserOrAdmin", async (requestData: EditUserOrAdminDto, thunkAPI) => {
    try {
        const request = await userService.editUserOrAdmin(requestData)
        return request.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})