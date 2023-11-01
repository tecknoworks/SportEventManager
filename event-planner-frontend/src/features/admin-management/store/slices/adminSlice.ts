import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "../thunks/getAllUsersThunk";



const initialState = {
    users: [],
    loading: {
        addUser: false,
        editUser: false,
        deleteUser: false,
        sendRecoveryEmail: false,
        getAllUsers: false,
    },
    error: {
        addUser: null,
        editUser: null,
        deleteUser: null,
        sendRecoveryEmail: null,
        getAllUsers: null as unknown,
    },
};

export const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsersThunk.pending, (state) => {
            state.loading.getAllUsers = true;
            state.error.getAllUsers = null;
        });
        builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading.getAllUsers = false;
        });
        builder.addCase(getAllUsersThunk.rejected, (state, action) => {
            state.error.getAllUsers = action.error.message || 'Failed to get users';
            state.loading.getAllUsers = false;
        });
    }
})


export default adminSlice.reducer;