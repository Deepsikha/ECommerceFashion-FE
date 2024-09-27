// src/components/Header.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
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
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Cart from '../../src/app/cart/page';
import { CartItemType } from '@/store/cartSlice';

interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSidebarToggle, sidebarOpen, addToCart, removeFromCart }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Access cart count and items from Redux state
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const cartItems = useSelector((state: RootState) => state.cart.items);

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

  const handleCartClick = () => {
    setCartOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const handleCloseCart = () => {
    setCartOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
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
            <IconButton
              edge="start"
              color="inherit"
              onClick={onSidebarToggle}
              sx={{ ml: 0, mr: 1 }}
            >
              {sidebarOpen ? <CloseIcon sx={{ color: '#ffffff' }} /> : <MenuIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />}
            </IconButton>

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

            <IconButton color="inherit" onClick={handleSearchToggle}>
              <SearchIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link href={"/"} className="header-icons">
                <IconButton color="inherit">
                  <HomeIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />
                </IconButton>
              </Link>
              <IconButton color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon sx={{ color: sidebarOpen ? '#fff' : '#282c34' }} />
                </Badge>
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
            <IconButton onClick={handleCloseSignIn} style={{ marginTop: '60px', color: 'white' }}>
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

      {cartOpen && (
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
            <IconButton onClick={handleCloseCart} style={{ marginTop: '60px', color: 'white' }}>
              <CloseIcon />
            </IconButton>
            <Cart
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
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
            onClick={handleCloseCart}
          />
        </>
      )}
    </>
  );
};
