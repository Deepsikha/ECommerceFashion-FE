import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItemType[];
  cartCount: number;
}

const initialState: CartState = {
  items: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // Add to cart function
    addToCart(state, action: PayloadAction<CartItemType>) {
      const item = action.payload;

      if (!item || typeof item.id !== "number") {
        console.error("Invalid payload:", action.payload);
        return;
      }

      const existingItem = state.items.find(
        (existing) => existing.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.cartCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
    },

    //Remove from cart function
    removeFromCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];

        if (state.items.length === 1 && existingItem.quantity === 1) {
        } else if (existingItem.quantity === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity -= 1;
        }
      }
      state.cartCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
    },

    // Delete from cart function (removes item completely)
    deleteFromCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      state.cartCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
    },

    //clear form cart
    clearCart(state) {
      state.items = [];
      state.cartCount = 0;
    },
  },
});

export const { addToCart, removeFromCart,deleteFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
