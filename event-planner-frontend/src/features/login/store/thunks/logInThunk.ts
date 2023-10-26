import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { log } from "console";
import { LogInDto } from "features/login/api/dtos";


export const logInThunk = createAsyncThunk(
    "logIn/logInThunk",
    async (userCredentials: LogInDto) => {
        const request = await axios.post("https://localhost:7013/api/User/Login", userCredentials)
        const response = await request.data.data
        localStorage.setItem("user", JSON.stringify(response))
        return response;
    }
)