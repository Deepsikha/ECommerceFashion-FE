import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Img1 from '../../public/images/img1.jpg';
import Img2 from '../../public/images/img2.jpg';
import Img3 from '../../public/images/img3.jpg';
import Img4 from '../../public/images/img4.jpg';
import Img5 from '../../public/images/img5.jpg';
import Img6 from '../../public/images/img6.jpg';
import Img7 from '../../public/images/img7.jpg';
import Img8 from '../../public/images/img8.jpg';
import { StaticImageData } from 'next/image';

type ImageType = string | StaticImageData;

interface SubSubMenuItem {
  id: number;
  title: string;
  image: ImageType; 
  imageName: string; // Added field for image name
}

interface SubMenuItem {
  id: number;
  title: string;
  image: ImageType; 
  subItems?: SubSubMenuItem[];
}

interface MenuItem {
  id: number;
  title: string;
  path: string; 
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
          image: Img1,
          subItems: [
            { id: 1, title: 'Bag 1', image: Img1, imageName: 'Stylish Bag' },
            { id: 2, title: 'Bag 2', image: Img2, imageName: 'Classic Bag' },
            { id: 3, title: 'Bag 3', image: Img3, imageName: 'Trendy Bag' }, 
          ],
        },
        {
          id: 2,
          title: 'Mini Bags',
          image: Img3,
          subItems: [
            { id: 1, title: 'Shoe 1', image: Img4, imageName: 'Casual Shoe' },
            { id: 2, title: 'Shoe 2', image: Img5, imageName: 'Formal Shoe' },
            { id: 3, title: 'Shoe 3', image: Img6, imageName: 'Sports Shoe' }, 
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
          title: 'Laptop',
          image: Img8,
          subItems: [
            { id: 1, title: 'Bag 1', image: Img1, imageName: 'Stylish Bag' },
            { id: 2, title: 'Bag 2', image: Img2, imageName: 'Classic Bag' },
            { id: 3, title: 'Bag 3', image: Img3, imageName: 'Trendy Bag' }, 
          ],
        },
        {
          id: 2,
          title: 'Shoes',
          image: Img4,
          subItems: [
            { id: 1, title: 'Shoe 1', image: Img4, imageName: 'Casual Shoe' },
            { id: 2, title: 'Shoe 2', image: Img5, imageName: 'Formal Shoe' },
            { id: 3, title: 'Shoe 3', image: Img6, imageName: 'Sports Shoe' }, 
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
          title: 'Necklace',
          image: Img7,
          subItems: [
            { id: 1, title: 'Bag 1', image: Img1, imageName: 'Stylish Bag' },
            { id: 2, title: 'Bag 2', image: Img2, imageName: 'Classic Bag' },
            { id: 3, title: 'Bag 3', image: Img3, imageName: 'Trendy Bag' }, 
          ],
        },
        {
          id: 2,
          title: 'Shoes',
          image: Img5,
          subItems: [
            { id: 1, title: 'Shoe 1', image: Img4, imageName: 'Casual Shoe' },
            { id: 2, title: 'Shoe 2', image: Img5, imageName: 'Formal Shoe' },
            { id: 3, title: 'Shoe 3', image: Img6, imageName: 'Sports Shoe' }, 
          ],
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
          title: 'Bags',
          image: Img6,
          subItems: [
            { id: 1, title: 'Bag 1', image: Img1, imageName: 'Stylish Bag' },
            { id: 2, title: 'Bag 2', image: Img2, imageName: 'Classic Bag' },
            { id: 3, title: 'Bag 3', image: Img3, imageName: 'Trendy Bag' }, 
          ],
        },
        {
          id: 2,
          title: 'Shoes',
          image: Img5,
          subItems: [
            { id: 1, title: 'Shoe 1', image: Img4, imageName: 'Casual Shoe' },
            { id: 2, title: 'Shoe 2', image: Img5, imageName: 'Formal Shoe' },
            { id: 3, title: 'Shoe 3', image: Img6, imageName: 'Sports Shoe' }, 
          ],
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
