"use client";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import "./globals.css";
import store from "@/store/store";
import { Header } from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { restoreSession } from "@/store/userSlice";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Provider store={store}>
      <Layout
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      >
        {children}
      </Layout>
    </Provider>
  );
};

const Layout = ({
  children,
  sidebarOpen,
  toggleSidebar,
}: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <html lang="en">
      <body>
        <Header onSidebarToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
