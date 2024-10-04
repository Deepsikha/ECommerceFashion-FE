import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllCategory = createAsyncThunk(
    "getAllCategory",
    async () => {
        try {
            const data = await axios.get(`${url}/Category/GetAllCategories`);
            return data.data;
        } catch (error:any) {
            throw error.response.data;
        }
    }
);

const initialState = {
    categories : [],
    errors : null
}

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(getAllCategory.pending,(state: any) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getAllCategory.fulfilled,(state: any,action: any) => {
            state.status = "succeeded";
            state.categories = action.payload.result;
        })
        .addCase(getAllCategory.rejected,(state: any,action: any) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
  })


export default CategorySlice.reducer;