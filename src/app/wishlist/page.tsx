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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToCartProduct, getAllWishListProduct } from "@/store/productSlice";
import { Products, WishListDetails } from "@/interface";

const Wishlist: React.FC = () => {
  const router = useRouter();
  // const products = useSelector((state: RootState) => state.ProductsSlice.productLists);
  const [wishList, setWishList] = useState<WishListDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();
  const userId = localStorage.getItem("id")


  const handleWishList = async () => {
    try {
      if(userId){
        const res = await dispatch(getAllWishListProduct(parseInt(userId)))
        if(res?.payload?.result == -1){
          alert(res?.payload?.message ?? "Already added in Wishlist")
          return;
        }
        setWishList(res.payload.result)
        setIsLoading(false);
      }
    } catch (errors) {
      console.log(errors)
    }
  }

  // Load wishlist from localStorage after component mounts
  useEffect(() => {
    // const storedWishList = localStorage.getItem("wishList");
    // if (storedWishList) {
    //   setWishList(JSON.parse(storedWishList));
    // }
    // setIsLoading(false);
    handleWishList();
  }, []);

  if (isLoading) {
    return <Typography>Loading wishlist...</Typography>;
  }

  // Filter products based on the wishlist
  // const filteredProducts = products.filter((product) =>
  //   wishList.includes(product.id)
  // );

  const handleAddToCart = async (id: number) => {
    try {
      const res = await dispatch(addToCartProduct({ productId: id, userId, quantity: 1 }))
      if(res?.payload?.result == -1){
        alert(res?.payload?.message ?? "Already added in cart")
      }
    } catch (errors) {
      console.log(errors)
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          margin: "50px 50px",
          rowGap: "50px",
          display: "grid",
          gridTemplateColumns: "repeat( auto-fill, minmax(300px, 1fr) )",
        }}
      >
        {wishList.length === 0 ? (
          <Typography>No items in your wishlist.</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 4,
            }}
          >
            {wishList.map((product,index) => (
              <>
                <Grid className={"card-item"} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                {/* Wishlist Icon */}
                <IconButton
                  color="inherit"
                  className="Card-wish-icon"
                  // onClick={() => handleWishList(product.id)}
                >
                  <FavoriteIcon
                    // sx={{
                    //   color: wishList.includes(product.id)
                    //     ? "#ff3d3d"
                    //     : "#ffffff",
                    // }}
                  />
                </IconButton>

                {/* Product Image */}
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

                {/* Product Info */}
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

                {/* Add to Cart Button */}
                <Typography variant="h4">
                  <Button
                  onClick={()=>handleAddToCart(product.id)}
                    sx={{
                      background: "black",
                      color: "white",
                      padding: "5px 10px",
                      fontWeight: "bold",
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
            </Grid>
              </>
            ))}
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Wishlist;
