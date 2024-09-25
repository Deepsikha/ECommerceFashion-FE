// store/menuSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
  id: number;
  title: string;
  path: string; // The path for navigation
}

interface MenuState {
  items: MenuItem[];
}

const initialState: MenuState = {
  items: [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'Products', path: '/products' },
    { id: 3, title: 'About', path: '/about' },
    { id: 4, title: 'Contact', path: '/contact' },
  ],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export const selectMenuItems = (state: { menu: MenuState }) => state.menu.items;
export default menuSlice.reducer;
