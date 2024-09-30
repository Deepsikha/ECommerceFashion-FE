// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    product:productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
