'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import SignIn from '@/app/signin/page';
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import Image from 'next/image';

interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSidebarToggle, sidebarOpen }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleSearchToggle = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleProfileClick = () => {
    setSignInOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSignIn = () => {
    setSignInOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: sidebarOpen ? 'black' : '#ffffff',
          boxShadow: 'none',
          color: sidebarOpen ? '#fff' : '#282c34',
          position: 'sticky',
          top: 0,
          zIndex: 9999,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: '0 8px', justifyContent: 'space-between' }}>
            {/* Sidebar Toggle Button */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={onSidebarToggle}
              sx={{ ml: 0, mr: 1 }}
            >
              {sidebarOpen ? <CloseIcon sx={{ color: '#ffffff',cursor:'pointer' }} /> : <MenuIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />}
            </IconButton>

            {/* Website Name */}
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                fontFamily: "Fredoka",
                fontWeight: 500,
                letterSpacing: '2px',
                color: sidebarOpen ? '#fff' : '#282c34',
              }}
            >
              ECommerce Fashion
            </Typography>

            {/* Search Input */}
            {searchVisible && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    p: 1,
                    flex: 1,
                  }}
                />
              </Box>
            )}

            {/* Search Icon to toggle search input */}
            <IconButton color="inherit" onClick={handleSearchToggle}>
              <SearchIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />
            </IconButton>

            {/* Icons on the Right */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href={"/"} className="header-icons">
                <IconButton color="inherit">
                  <HomeIcon />
                </IconButton>
              </Link>
              <IconButton color="inherit">
                <ShoppingCartIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />
              </IconButton>
              <Link href={"/wishlist"} className="header-icons">
                <IconButton color="inherit">
                  <FavoriteIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />
                </IconButton>
              </Link>
              <IconButton color="inherit" onClick={handleProfileClick}>
                <AccountCircle sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Conditional Rendering of Sign-In Sidebar */}
      {signInOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '500px',
              height: '100%',
              backgroundColor: 'black',
              color: 'white',
              zIndex: 1100,
              padding: '20px',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <IconButton onClick={handleCloseSignIn} style={{ marginBottom: '20px', color: 'white' }}>
              <CloseIcon />
            </IconButton>
            <SignIn />
          </div>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
            }}
            onClick={handleCloseSignIn}
          />
        </>
      )}
    </>
  );
};
