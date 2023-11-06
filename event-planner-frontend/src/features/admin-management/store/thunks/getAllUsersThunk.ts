import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "services/userService";

const userService: UserService = new UserService();

export const getAllUsersThunk = createAsyncThunk('adminSlice/GetUsers', async () => {
    try {
        const request = await userService.getAllUsers()
        const response = await request.data;
        return response
    } catch (error: any) {
        return new Error(error.response?.data || 'Error occured')
    }
})