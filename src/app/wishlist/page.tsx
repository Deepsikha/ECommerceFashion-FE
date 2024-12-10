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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addToCartProduct,
  addToWishListProduct,
  deleteWishListProduct,
  getAllWishListProduct,
} from "@/store/productSlice";
import { Products, WishListDetails } from "@/interface";
import { ToastError } from "@/components/ToastMessage";
import useFlyingAnimation from "@/hooks/useFlyingAnimation";

const Wishlist: React.FC = () => {
  const [wishList, setWishList] = useState<WishListDetails[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [cartList, setCartList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();
  const userId = localStorage.getItem("id");
  const { animateFlyToCart } = useFlyingAnimation();
  const route = useRouter();

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>(
    new Array(wishList.length).fill(null)
  );

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishList(JSON.parse(storedWishlist));
    }
  }, []);

  const handleWishList = async () => {
    if (userId) {
      try {
        const res = await dispatch(getAllWishListProduct(parseInt(userId)));
        if (res?.payload?.result === -1) {
          alert(res?.payload?.message ?? "Error loading wishlist");
          setIsLoading(false);
          return;
        }
        setWishList(res.payload.result);
        setIsLoading(false);
      } catch (errors) {
        console.log(errors);
        setIsLoading(false);
      }
    } else {
      ToastError("Please log in to view your wishlist.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) handleWishList();
  }, [userId]);

  if (isLoading) {
    return <Typography>Loading wishlist...</Typography>;
  }

  const handleAddToCart = async (
    products: WishListDetails,
    button: HTMLButtonElement
  ) => {
    try {
      const res = await dispatch(
        addToCartProduct({ productId: products.id, userId, quantity: 1 })
      );
      animateFlyToCart(button);
      if (res?.payload?.result == -1) {
        ToastError(res?.payload?.message || "An error occurred.");
      }
      setCartList((prevList) => {
        const newList = prevList.filter((item) => item !== products.id);
        return newList;
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleToggleWishlist = async (id: number) => {
    const isInWishlist = wishList.some((product) => product.id === id);
    try {
      if (isInWishlist) {
        const res = await dispatch(deleteWishListProduct(id));

        if (res?.payload === undefined || res?.error) {
          ToastError(res?.error?.message || "Error removing from wishlist");
          return;
        }

        setWishList((prev) => prev.filter((product) => product.id !== id));
        const updatedWishlist = wishList.filter((product) => product.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } else {
        const res = await dispatch(
          addToWishListProduct({ productId: id, userId })
        );
        if (res?.payload?.result == -1) {
          alert(res?.payload?.message ?? "Error adding to wishlist");
          return;
        }

        setWishList((prev) => [...prev, res.payload]);
        const updatedWishlist = [...wishList, res.payload];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
    } catch (errors) {
      console.log("Error toggling wishlist:", errors);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          margin: "50px 50px",
        }}
      >
        {wishList.length === 0 ? (
          <Typography>No items in your wishlist.</Typography>
        ) : (
          wishList.map((product) => (
            <Box key={product.id} sx={{ flex: "0 1 300px", display: "flex" }}>
              <Card sx={{ width: "100%" }}>
                <IconButton
                  color="inherit"
                  className="Card-wish-icon"
                  onClick={() => handleToggleWishlist(product.id)}
                >
                  <FavoriteIcon
                    sx={{
                      color: wishList.some((item) => item.id === product.id)
                        ? "#ff3d3d"
                        : "#ffffff",
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
                      image={`${
                        process.env.NEXT_PUBLIC_APP_API_IMAGE_URL
                      }${product.image.replace(/^~\//, "")}`}
                      title={product.productName}
                    />
                  </Link>
                </Box>

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "1",
                      "-webkit-box-orient": "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.productName}
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      display: "-webkit-box",
                      "-webkit-line-clamp": "1",
                      "-webkit-box-orient": "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.productDescription}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ${product.productPrice}
                  </Typography>
                </CardContent>

                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", marginBottom: "2px" }}
                >
                  <Button
                    ref={(el) => {
                      buttonRefs.current[product.id - 1] = el;
                    }}
                    onClick={(e1) => handleAddToCart(product, e1.currentTarget)}
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
                    <ShoppingCartIcon
                      sx={{ color: "#fff", marginRight: "10px" }}
                    />
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
