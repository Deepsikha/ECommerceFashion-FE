"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToCartProduct, addToWishListProduct, deleteWishListProduct, getAllWishListProduct } from "@/store/productSlice";
import { Products, WishListDetails } from "@/interface";
import { ToastError } from "@/components/ToastMessage";
import useFlyingAnimation from "@/hooks/useFlyingAnimation";

const Wishlist: React.FC = () => {
  const router = useRouter();
  const [wishList, setWishList] = useState<WishListDetails[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();
  const userId = localStorage.getItem("id");
  const { animateFlyToCart } = useFlyingAnimation();

    // Create a ref for the button
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>(new Array(products.length).fill(null));

  const handleWishList = async () => {
    try {
      if (userId) {
        const res = await dispatch(getAllWishListProduct(parseInt(userId)));
        if (res?.payload?.result == -1) {
          alert(res?.payload?.message ?? "Error loading wishlist");
          return;
        }
        setWishList(res.payload.result);
        setIsLoading(false);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  // Load wishlist from API after component mounts
  useEffect(() => {
    handleWishList();
  }, []);

  if (isLoading) {
    return <Typography>Loading wishlist...</Typography>;
  }

  const handleAddToCart = async (products: WishListDetails, button: HTMLButtonElement) => {
    try {
      const res = await dispatch(addToCartProduct({ productId: products.id, userId, quantity: 1 }))
      animateFlyToCart(button);
      if (res?.payload?.result == -1) {
        ToastError(res?.payload?.message || "An error occurred.");
      }
    } catch (errors) {
      // ToastError(errors?.message || "An error occurred.");
      console.log(errors)
    }
  }

  const handleToggleWishlist = async (id: number) => {
    const isInWishlist = wishList.some(product => product.id === id);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        const res = await dispatch(deleteWishListProduct(id));
        if (res?.payload?.result == -1) {
          alert(res?.payload?.message ?? "Error removing from wishlist");
          return;
        }
        setWishList((prev) => prev.filter(product => product.id !== id));
      } else {
        // Add to wishlist
        const res = await dispatch(addToWishListProduct({ productId: id, userId }));
        if (res?.payload?.result == -1) {
          alert(res?.payload?.message ?? "Error adding to wishlist");
          return;
        }
        setWishList((prev) => [...prev]);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          margin: '50px 50px',
        }}
      >
        {wishList.length === 0 ? (
          <Typography>No items in your wishlist.</Typography>
        ) : (
          wishList.map((product) => (
            <Box key={product.id} sx={{ flex: '0 1 300px', display: 'flex' }}>
              <Card sx={{ width: '100%' }}>
                <IconButton
                  color="inherit"
                  className="Card-wish-icon"
                  onClick={() => handleToggleWishlist(product.id)}
                >
                  <FavoriteIcon
                    sx={{
                      color: wishList.some(item => item.id === product.id) ? "#ff3d3d" : "#ffffff",
                    }}
                  />
                </IconButton>

                <Box
                  sx={{
                    height: 300,
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Link href={`/pages/${product.id}`}>
                    <CardMedia
                      sx={{
                        height: "100%",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      image={`${process.env.NEXT_PUBLIC_APP_API_IMAGE_URL}${product.image.replace(/^~\//, '')}`}
                      title={product.productName}
                    />
                  </Link>
                </Box>

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{
                    display: '-webkit-box',
                    '-webkit-line-clamp': '1',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.productName}
                  </Typography>
                  <Typography component="div" sx={{
                    display: '-webkit-box',
                    '-webkit-line-clamp': '1',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.productDescription}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ${product.productPrice}
                  </Typography>
                </CardContent>

                <Typography variant="h4" sx={{ textAlign: "center",marginBottom:'2px',}}>
                  <Button
                    onClick={(e) => handleAddToCart(product, e.currentTarget)}
                    sx={{
                      background: "black",
                      
                      color: "white",
                      padding: "5px 10px",
                      fontWeight: "bold",
                      "&:hover": {
                        background: "#a8a5a5",
                      },
                    }}
                  >
                    <ShoppingCartIcon sx={{ color: "#fff", marginRight: "10px" }} />
                    Add
                  </Button>
                  <Link href={`/pages/${product.id}`}>
                    <Button
                      sx={{
                        marginLeft: "10px",
                        background: "black",
                        color: "white",
                        padding: "5px 10px",
                        fontWeight: "bold",
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </Typography>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Wishlist;

