'use client';
import React, { useState } from "react";
import { Provider} from "react-redux";
import "./globals.css";
import store from "@/store/store";
import { Header } from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Header
            onSidebarToggle={toggleSidebar}
            sidebarOpen={sidebarOpen}
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
