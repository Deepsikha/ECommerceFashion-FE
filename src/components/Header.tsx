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

interface HeaderProps {
  onSidebarToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleSearchToggle = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleProfileClick = () => {
    setSignInOpen(true);
  };

  const handleCloseSignIn = () => {
    setSignInOpen(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none',  color: '#282c34', position: 'sticky', top: 0, zIndex:9999 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ padding: '0 8px', justifyContent: 'space-between' }}>
          {/* Sidebar Toggle Button */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={onSidebarToggle}
            sx={{ ml: 0, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Website Name */}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 900, letterSpacing: '0.5px'}}>
               ECommerce Fashion
          </Typography>

          {/* Search Input */}
          {searchVisible && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ border: '1px solid #ccc', borderRadius: 1, p: 1, flex: 1 }}
              />
            </Box>
          )}

          {/* Search Icon to toggle search input */}
          <IconButton color="inherit" onClick={handleSearchToggle}>
            <SearchIcon />
          </IconButton>

          {/* Icons on the Right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit">
              <FavoriteIcon />
            </IconButton>
            {/* Account Icon to open Sign In Dialog */}
            <IconButton color="inherit" onClick={handleProfileClick}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Conditional Rendering of Sign-In Sidebar */}
      {signInOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '500px',
            height: '100%',
            backgroundColor: 'black',
            color: 'white',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <IconButton onClick={handleCloseSignIn} style={{ marginBottom: '20px', color: 'white' }}>
            <CloseIcon />
          </IconButton>
          <SignIn />
        </div>
      )}
    </AppBar>
  );
};
