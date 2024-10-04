// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import cartReducer from './cartSlice';
import categoryReducer from './categoriesSlice';
import subCategoryReducer from './subCategoriesSlice';
import productsReducer from './productSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    ProductsSlice: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
