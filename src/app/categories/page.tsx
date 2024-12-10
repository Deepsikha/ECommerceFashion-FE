"use client";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartProduct,
  addToWishListProduct,
  deleteWishListProduct,
  getAllProductsLists,
} from "@/store/productSlice";
import { Products } from "@/interface";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ToastError } from "@/components/ToastMessage";
import MoonLoader from "react-spinners/MoonLoader";
import useFlyingAnimation from "@/hooks/useFlyingAnimation";
import { ToastContainer } from "react-toastify";

const Categories: React.FC = () => {
  const [wishList, setWishList] = useState<number[]>([]);
  const [cartList, setCartList] = useState<number[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const { animateFlyToCart } = useFlyingAnimation();

  // Create a ref for the button
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>(
    new Array(products.length).fill(null)
  );

  const categorySelector = useSelector(
    (state: any) => state.categories.categories
  );
  const userId = localStorage.getItem("id");


  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    const storedWishList = localStorage.getItem("wishlist");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }

    const fetchProducts = async () => {
      const { payload } = await dispatch(getAllProductsLists());
      setProducts(payload.result);
    };

    fetchProducts();
  }, [dispatch]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "All Categories" },
  ];

  const handleAddToCart = async (
    products: Products,
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

  const handleWishList = async (id: number) => {
    const isInWishlist = wishList.includes(id);

    try {
      if (isInWishlist) {
        const res = await dispatch(deleteWishListProduct(id));
        if (res?.payload?.result === -1) {
          ToastError(
            res?.payload?.message ||
              "An error occurred while removing from wishlist."
          );
          return;
        }

        setWishList((prevList) => {
          const newList = prevList.filter((item) => item !== id);
          localStorage.setItem("wishlist", JSON.stringify(newList));
          return newList;
        });
      } else {
        const res = await dispatch(
          addToWishListProduct({ productId: id, userId })
        );
        if (res?.payload?.result === -1) {
          ToastError(
            res?.payload?.message ||
              "An error occurred while adding to wishlist."
          );
          return;
        }

        setWishList((prevList) => {
          const newList = [...prevList, id];
          localStorage.setItem("wishlist", JSON.stringify(newList));
          return newList;
        });
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ padding: 4 }} id="category-list">
        {/* breadcrumbs section */}
        <CustomBreadcrumbs items={breadcrumbItems}></CustomBreadcrumbs>
        <Typography variant="h4" className="Top-heading">
          View All Products
        </Typography>

        <Box sx={{ backgroundColor: "#e9e9e9" }}>
          <Grid
            container
            spacing={4}
            sx={{
              margin: "25px 0px",
              rowGap: "50px",
              justifyContent: "center",
            }}
          >
            {categorySelector &&
              categorySelector.map((item: any, index: number) => {
                return (
                  <>
                    {item.isActive && (
                      <Grid key={index}>
                        <Link
                          className="categories-link"
                          href={`/categories/${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </Grid>
                    )}
                  </>
                );
              })}
          </Grid>
        </Box>

        {/* Products Grid */}
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
          {products &&
            products.map((product, index) => (
              <>
                <Grid className={"card-item"} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    {/* Wishlist Icon */}
                    <IconButton
                      color="inherit"
                      className="Card-wish-icon"
                      onClick={() => handleWishList(product.id)}
                    >
                      <FavoriteIcon
                        sx={{
                          color: wishList.includes(product.id)
                            ? "#ff3d3d"
                            : "#ffffff",
                        }}
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
                          image={`${
                            process.env.NEXT_PUBLIC_APP_API_IMAGE_URL
                          }${product.image.replace(/^~\//, "")}`}
                          title={product.name}
                        />
                      </Link>
                    </Box>

                    {/* Product Info */}
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
                        {product.name}
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
                        {product.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>

                    {/* Add to Cart Button */}
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                      <Button
                        ref={(el) => {
                          buttonRefs.current[product.id - 1] = el;
                        }}
                        onClick={(e1) =>
                          handleAddToCart(product, e1.currentTarget)
                        }
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
                </Grid>
              </>
            ))}

          {/* Loader Overlay */}
          {isLoading && (
            <Box
              sx={{
                position: "fixed",
                top: "64px",
                left: 0,
                width: "100vw",
                height: `calc(100vh - 64px)`,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MoonLoader color="#000" loading={isLoading} size={50} />
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Categories;
