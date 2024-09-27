'use client';
import React, { useState } from "react";
import { Provider} from "react-redux";
import "./globals.css";
import store from "@/store/store";
import { Header } from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
// import { addToCart, CartItemType, removeFromCart } from "@/store/cartSlice";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const dispatch=useDispatch();

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleAddToCart = () => {
    //dispatch(addToCart(item));
    console.log("")
  };

  const handleRemoveFromCart = () => {
    // dispatch(removeFromCart(id));
    console.log("")
  };
  
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Header
            onSidebarToggle={toggleSidebar}
            sidebarOpen={sidebarOpen}
            addToCart={handleAddToCart} 
            removeFromCart={handleRemoveFromCart} 
          />
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
