// store/menuSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubSubMenuItem {
  id: number;
  title: string;
  image: string;
}

interface SubMenuItem {
  id: number;
  title: string;
  image: string;
  subItems?: SubSubMenuItem[];
}

interface MenuItem {
  id: number;
  title: string;
  path: string; // The path for navigation
  subItems?: SubMenuItem[];
}

interface MenuState {
  items: MenuItem[];
  mainSidebarOpen: boolean;
  imageSidebarOpen: boolean;
}

const initialState: MenuState = {
  items: [
    {
      id: 1,
      title: 'Home',
      path: '/',
      subItems: [
        {
          id: 1,
          title: 'Bags',
          image: '/images/Bag1.jpg',
          subItems: [
            { id: 1, title: 'Bag 1', image: '/images/Bag1.jpg' },
            { id: 2, title: 'Bag 2', image: '/images/bag2.jpg' },
          ],
        },
        {
          id: 2,
          title: 'Shoes',
          image: '/images/img1.jpg',
          subItems: [
            { id: 1, title: 'Shoe 1', image: '/images/img1.jpg' },
            { id: 2, title: 'Shoe 2', image: '/images/img1.jpg' },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Products',
      path: '/products',
      subItems: [
        {
          id: 1,
          title: 'Electronics',
          image: '/images/img2.jpg',
          subItems: [
            { id: 1, title: 'Phone 1', image: '/images/img2.jpg' },
            { id: 2, title: 'Phone 2', image: '/images/img2.jpg' },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'About',
      path: '/about',
      subItems: [
        {
          id: 1,
          title: 'Our Team',
          image: '/images/img2.jpg',
        },
      ],
    },
    {
      id: 4,
      title: 'Contact',
      path: '/contact',
      subItems: [
        {
          id: 1,
          title: 'Support',
          image: '/images/img2.jpg',
        },
      ],
    },
  ],
  mainSidebarOpen: false,
  imageSidebarOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMainSidebar(state, action: PayloadAction<boolean>) {
      state.mainSidebarOpen = action.payload;
    },
    toggleImageSidebar(state, action: PayloadAction<boolean>) {
      state.imageSidebarOpen = action.payload;
    },
  },
});

// Actions
export const { toggleMainSidebar, toggleImageSidebar } = menuSlice.actions;

// Selectors
export const selectMenuItems = (state: { menu: MenuState }) => state.menu.items;
export const selectMainSidebarOpen = (state: { menu: MenuState }) => state.menu.mainSidebarOpen;
export const selectImageSidebarOpen = (state: { menu: MenuState }) => state.menu.imageSidebarOpen;

// Export the reducer
export default menuSlice.reducer;
