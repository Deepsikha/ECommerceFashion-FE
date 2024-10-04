import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllSubCategoryByCategoryId = createAsyncThunk(
    "getAllSubCategory",
    async (id: number) => {
        try {
            const data = await axios.get(`${url}/Category/GetSubCategoryByCategoryId?categoryId=${id}`);
            return data.data;
        } catch (error:any) {
            throw error.response.data;
        }
    }
);

const initialState = {
    subcategories : [],
    errors : null
}

const SubCategorySlice = createSlice({
    name: "subcategory",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(getAllSubCategoryByCategoryId.pending,(state: any) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getAllSubCategoryByCategoryId.fulfilled,(state: any,action: any) => {
            state.status = "succeeded";
            state.subcategories = action.payload.result;
        })
        .addCase(getAllSubCategoryByCategoryId.rejected,(state: any,action: any) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
  })

export default SubCategorySlice.reducer;