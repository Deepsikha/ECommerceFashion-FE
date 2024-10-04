import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/Products`;

export const getAllProducts = createAsyncThunk(
    "getAllProducts",
    async (SubCategoryid: number) => {
        try {
            const data = await axios.get(`${url}/GetAllProducts?subCategoryFilter=${SubCategoryid}`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getAllProductsByCategoriesIds = createAsyncThunk(
    "getAllProductsByCategoriesIds",
    async (Categoryid: number) => {
        try {
            const data = await axios.get(`${url}/GetAllProducts?categoryFilter=${Categoryid}`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getAllProductsLists = createAsyncThunk(
    "getAllProductsLists",
    async () => {
        try {
            const data = await axios.get(`${url}/GetAllProductsList`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getProductsById = createAsyncThunk(
    "getProductsById",
    async (id: number) => {
        try {
            const data = await axios.get(`${url}/GetProductsById?id=${id}`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);


export const addToCartProduct = createAsyncThunk(
    "addToCartProduct",
    async (val: object) => {
        try {
            const data = await axios.post(`${url}/AddToCart`, val);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getAllCartProduct = createAsyncThunk(
    "getAllCartProduct",
    async (userId: number) => {
        try {
            const data = await axios.get(`${url}/GetUserCartDetails?userId=${userId}`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const updateCartProduct = createAsyncThunk(
    "updateCartProduct",
    async ({ cartId, value }: { cartId: number; value: object }) => {
        try {
            const data = await axios.patch(`${url}/UpdateCart?cartId=${cartId}`, value);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const deleteCartProduct = createAsyncThunk(
    "deleteCartProduct",
    async (cartId: number) => {
        try {
            const data = await axios.delete(`${url}/DeleteCartItem?cartId=${cartId}`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const addToWishListProduct = createAsyncThunk(
    "addToWishListProduct",
    async (val: object) => {
        try {
            const data = await axios.post(`${url}/AddToWishlist`, val);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getAllWishListProduct = createAsyncThunk(
    "getAllWishListProduct",
    async (userId: number) => {
        try {
            const data = await axios.get(`${url}/GetUserWishlistDetails?userId=${userId}`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const deleteWishListProduct = createAsyncThunk(
    "deleteWishListProduct",
    async (id: number) => {
        try {
            const data = await axios.delete(`${url}/DeleteWishlistItem?id=${id}`);
            return data.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

const initialState = {
    products: [],
    productLists: [],
    cartData: [],
    productById: null,
    errors: null
}

const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllProducts.pending, (state: any) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state: any, action: any) => {
                state.status = "succeeded";
                state.products = action.payload.result;
            })
            .addCase(getAllProducts.rejected, (state: any, action: any) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(getAllProductsLists.pending, (state: any) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllProductsLists.fulfilled, (state: any, action: any) => {
                state.status = "succeeded";
                state.productLists = action.payload.result;
            })
            .addCase(getAllProductsLists.rejected, (state: any, action: any) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(getProductsById.pending, (state: any) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProductsById.fulfilled, (state: any, action: any) => {
                state.status = "succeeded";
                state.productById = action.payload.result;
            })
            .addCase(getProductsById.rejected, (state: any, action: any) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(getAllProductsByCategoriesIds.pending, (state: any) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllProductsByCategoriesIds.fulfilled, (state: any, action: any) => {
                state.status = "succeeded";
                // state.productById = action.payload.result;
            })
            .addCase(getAllProductsByCategoriesIds.rejected, (state: any, action: any) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(getAllCartProduct.pending, (state: any) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAllCartProduct.fulfilled, (state: any, action: any) => {
                state.status = "succeeded";
                state.cartData = action.payload.result;
            })
            .addCase(getAllCartProduct.rejected, (state: any, action: any) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})


export default ProductsSlice.reducer;