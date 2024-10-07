import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { deleteCookie, setCookie } from "cookies-next";
import axiosInstance from "./axiosInstance";
import {jwtDecode} from "jwt-decode";

interface User {   
        firstName: string,
        lastName: string,
        emailAddress: string,
        password: string,
        address: string,
        phoneNumber: string,
        isTnCApplied: true
}

interface UserState {
    user: User | null; 
    isAuthenticated: boolean;
    error: null | string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export const signUpUser = createAsyncThunk(
    "userRegister",
    async (val: object) => {
        try {
            const createUser = await axiosInstance.post("/UserMaster/RegisterUser", val);
            return createUser.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
)

export const signInUser = createAsyncThunk(
    "userLogin",
    async (values: object) => {
        try {
            const createUser = await axios.post(`${url}/UserMaster/Login`, values);
            setCookie("token", createUser?.data?.token);
            var token = createUser?.data?.token;
            var decodedToken = jwtDecode(token);
            localStorage.setItem("token", token)
            localStorage.setItem("email", decodedToken.email)
            localStorage.setItem("id", decodedToken.id)
            return createUser.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
)

const initialState:UserState = {
    user:  null,
    isAuthenticated: false,
    error: null,
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            deleteCookie("role");
            deleteCookie("token");
        },
    },
    extraReducers(builder) {
        builder
            .addCase(signUpUser.pending, (state: any) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state: any, action: any) => {
                state.status = "succeeded";
            })
            .addCase(signUpUser.rejected, (state: any, action: any) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(signInUser.pending, (state: any) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state: any, action: any) => {
                state.status = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signInUser.rejected, (state: any, action: any) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
})

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;