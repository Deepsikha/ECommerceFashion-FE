import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  address: string;
  phoneNumber: string;
  isTnCApplied: true;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const url = process.env.NEXT_PUBLIC_API_URL;

const storeTokenAndUserData = (token: string) => {
  setCookie("token", token, { path: "/" });
  localStorage.setItem("token", token);

  const decodedToken = jwtDecode(token);
  localStorage.setItem("email", decodedToken.email);
  localStorage.setItem("id", decodedToken.id);
};

const checkTokenExpiration = (token: string) => {
  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

// Async thunks
export const signUpUser = createAsyncThunk(
  "user/register",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/UserMaster/RegisterUser`,
        values
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/login",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/UserMaster/Login`, values);
      const token = response?.data?.token;
      if (token) {
        storeTokenAndUserData(token);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      deleteCookie("token");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("wishlist");
    },
    restoreSession: (state) => {
      const token = localStorage.getItem("token");
      if (token && !checkTokenExpiration(token)) {
        const decodedToken: any = jwtDecode(token);
        state.isAuthenticated = true;
        state.user = {
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          emailAddress: decodedToken.email,
          password: "",
          address: "",
          phoneNumber: "",
          isTnCApplied: true,
        };
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, restoreSession } = userSlice.actions;
export default userSlice.reducer;
