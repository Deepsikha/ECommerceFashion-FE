import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
}

interface ProductState {
    items: Product[];
}

const initialState: ProductState = {
    items: [  {
        id: 1,
        title: "Product1",
        image: "/images/img1.jpg",
        price: 125,
        description: "Stylish handbag perfect for any occasion.",
      },
      {
        id: 2,
        title: "Product2",
        image: "/images/img2.jpg",
        price: 125,
        description: "Elegant handbag made from premium materials.",
      },
      {
        id: 3,
        title: "Product3",
        image: "/images/img3.jpg",
        price: 125,
        description: "Spacious handbag with multiple compartments.",
      },  {
        id: 4,
        title: "Product4",
        image: "/images/img4.jpg",
        price: 125,
        description: "Fashionable bag with a sleek design.",
      },
      {
        id: 5,
        title: "Product5",
        image: "/images/img5.jpg",
        price: 1255,
        description: "Trendy handbag with modern accents.",
      },
      {
        id: 6,
        title: "Product6",
        image: "/images/img6.jpg",
        price: 125,
        description: "Compact handbag suitable for casual outings.",
      },
      {
        id: 7,
        title: "Product7",
        image: "/images/img7.jpg",
        price: 125,
        description: "Classic handbag with a timeless look.",
      },
      {
        id: 8,
        title: "Product8",
        image: "/images/img8.jpg",
        price: 125,
        description: "Luxury handbag for special occasions.",
      },
      {
        id: 9,
        title: "Product9",
        image: "/images/nack1.jpg",
        price: 125,
        description: "Chic handbag that combines style and functionality.",
      }], 
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.items = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
