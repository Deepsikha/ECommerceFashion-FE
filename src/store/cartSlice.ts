import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  amount: number;
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
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemType>) {
      const item = action.payload;

      if (!item || typeof item.id !== 'number') {
        console.error('Invalid payload:', action.payload);
        return; 
      }

      const existingItem = state.items.find(existing => existing.id === item.id);

      if (existingItem) {
        existingItem.amount += 1;
      } else {
        state.items.push({ ...item, amount: 1 });
      }

      state.cartCount = state.items.reduce((count, item) => count + item.amount, 0);
    },
    removeFromCart(state, action: PayloadAction<number>) {
  const itemId = action.payload;
  const existingItemIndex = state.items.findIndex(item => item.id === itemId);

  if (existingItemIndex >= 0) {
    const existingItem = state.items[existingItemIndex];

    if (state.items.length === 1 && existingItem.amount === 1) {
      console.log('Cannot remove the last item');
    } else if (existingItem.amount === 1) {
      state.items.splice(existingItemIndex, 1);
    } else {
      existingItem.amount -= 1;
    }
  }
      state.cartCount = state.items.reduce((count, item) => count + item.amount, 0);
    },
    clearCart(state) {
      state.items = [];
      state.cartCount = 0; 
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
