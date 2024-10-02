import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Container,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SignIn from "@/app/signin/page";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Cart from "../../src/app/cart/page";
import { CartItemType } from "@/store/cartSlice";
import { useScreenSize } from "@/hooks/useScreenSize";

interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSidebarToggle,
  sidebarOpen,
  addToCart,
  removeFromCart,
  deleteFromCart,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { isMobile } = useScreenSize();

  // Access cart count and items from Redux state
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleSearchToggle = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleProfileClick = () => {
    setSignInOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const handleCloseSignIn = () => {
    setSignInOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleCartClick = () => {
    setCartOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const handleCloseCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: sidebarOpen ? "black" : "#ffffff",
          boxShadow: "none",
          color: sidebarOpen ? "#fff" : "#282c34",
          position: "sticky",
          top: 0,
          zIndex: 9999,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: "0 8px", justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onSidebarToggle}
              sx={{ ml: 0, mr: 1 }}
            >
              {sidebarOpen ? (
                <CloseIcon
                  sx={{ color: "white", "&:hover": { color: "#666161" } }}
                />
              ) : (
                <MenuIcon
                  sx={{
                    color: sidebarOpen ? "#fff" : "#282c34",
                    "&:hover": {
                      color: sidebarOpen ? "#fff" : "#666161",
                    },
                  }}
                />
              )}
            </IconButton>
            {/* Website Name */}
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textAlign: "center",
                fontFamily: "Fredoka",
                fontWeight: 500,
                letterSpacing: "2px",
                color: sidebarOpen ? "#fff" : "#282c34",
              }}
            >
              ECommerce Fashion
            </Typography>
            {/* search Icon */}
            {searchVisible && (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  sx={{
                    border: "1px solid #ccc",
                    color: sidebarOpen ? "#fff" : "#282c34",
                    borderRadius: 1,
                    p: 1,
                    flex: 1,
                  }}
                />
              </Box>
            )}
            <IconButton color="inherit" onClick={handleSearchToggle}>
              <SearchIcon
                sx={{
                  color: sidebarOpen ? "#fff" : "#282c34",
                  "&:hover": {
                    color: sidebarOpen ? "#fff" : "#666161",
                  },
                }}
              />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Home Icon */}
              <Link href={"/"} className="header-icons">
                <IconButton color="inherit" >
                  <HomeIcon
                    sx={{
                      color: sidebarOpen ? "#fff" : "#161920",
                      "&:hover": {
                        color: sidebarOpen ? "#fff" : "#666161",
                      },
                    }}
                  />
                </IconButton>
              </Link>
              {/* ShoppingCart Icon */}
              <IconButton color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon
                    sx={{
                      color: sidebarOpen ? "#fff" : "#282c34",
                      "&:hover": {
                        color: sidebarOpen ? "#fff" : "#666161",
                      },
                    }}
                  />
                </Badge>
              </IconButton>
              {/* Wishlist Icon */}
              <Link href={"/wishlist"} className="header-icons">
                <IconButton color="inherit">
                  <FavoriteIcon
                    sx={{
                      color: sidebarOpen ? "#fff" : "#282c34",
                      "&:hover": {
                        color: sidebarOpen ? "#fff" : "#666161",
                      },
                    }}
                  />
                </IconButton>
              </Link>
              {/* Profile Icon */}
              <IconButton color="inherit" onClick={handleProfileClick}>
                <AccountCircle
                  sx={{
                    color: sidebarOpen ? "#fff" : "#282c34",
                    "&:hover": {
                      color: sidebarOpen ? "#fff" : "#666161",
                    },
                  }}
                />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* SignIn & SignUp Toggle */}
      {signInOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: '64px',
              right: 0,
              width: isMobile ? "100%" : "500px",
              height: 'calc(100% - 64px)',
              backgroundColor: "black",
              color: "white",
              zIndex: 1100,
              padding: "20px",
              transition: "transform 0.3s ease-in-out",
              boxSizing: 'border-box',
            }}
          >
            <IconButton
              onClick={handleCloseSignIn}
              style={{
                marginLeft: 'auto',
                display:'flex',
              }}
              sx={{ color: "white", "&:hover": { color: "#b1b1b1" } }}
            >
              <CloseIcon />
            </IconButton>
            <SignIn />
          </div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
            onClick={handleCloseSignIn}
          />
        </>
      )}

      {/* ShoppingCart Toggle */}
      {cartOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: '64px',
              right: 0,
              width: isMobile ? "100%" : "500px",
              height: 'calc(100% - 64px)',
              backgroundColor: "black",
              color: "white",
              zIndex: 1100,
              padding: "20px",
              transition: "transform 0.3s ease-in-out",
              boxSizing: 'border-box',
            }}
          >
            <IconButton
              onClick={handleCloseCart}
              style={{
                marginLeft: 'auto',
                display:'flex',
              }}
              sx={{ color: "white", "&:hover": { color: "#666161" } }}
            >
              <CloseIcon />
            </IconButton>
            <Cart
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              deleteFromCart={deleteFromCart}
            />
          </div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
            onClick={handleCloseCart}
          />
        </>
      )}
    </>
  );
};
