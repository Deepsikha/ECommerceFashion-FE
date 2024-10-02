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
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { useDispatch } from "react-redux";
import { addToCart, CartItemType } from "@/store/cartSlice";
import MoonLoader from "react-spinners/MoonLoader";


// Sample product data
const products = [
  {
    id: 1,
    title: "Product1",
    image: "/images/img1.jpg",
    price: 125,
    description: "Stylish handbag perfect for any occasion.",
  },
  {
    id: 2,
    title: "Product2",
    image: "/images/img2.jpg",
    price: 125,
    description: "Elegant handbag made from premium materials.",
  },
  {
    id: 3,
    title: "Product3",
    image: "/images/img3.jpg",
    price: 125,
    description: "Spacious handbag with multiple compartments.",
  },
  {
    id: 4,
    title: "Product4",
    image: "/images/img4.jpg",
    price: 125,
    description: "Fashionable bag with a sleek design.",
  },
  {
    id: 5,
    title: "Product5",
    image: "/images/img5.jpg",
    price: 1255,
    description: "Trendy handbag with modern accents.",
  },
  {
    id: 6,
    title: "Product6",
    image: "/images/img6.jpg",
    price: 125,
    description: "Compact handbag suitable for casual outings.",
  },
  {
    id: 7,
    title: "Product7",
    image: "/images/img7.jpg",
    price: 125,
    description: "Classic handbag with a timeless look.",
  },
  {
    id: 8,
    title: "Product8",
    image: "/images/img8.jpg",
    price: 125,
    description: "Luxury handbag for special occasions.",
  },
  {
    id: 9,
    title: "Product9",
    image: "/images/nack1.jpg",
    price: 125,
    description: "Chic handbag that combines style and functionality.",
  },
];

const Categories: React.FC = () => {
  const [wishList, setWishList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();  

  const handleLinkClick = () => {
    setIsLoading(true);
  };


  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, []);

  // Function to add item to the cart
  const handleAddToCart = (item: CartItemType) => {
    dispatch(addToCart(item));
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "All Categories" },
  ];

  // Function to toggle wishlist
  const handleWishList = (id: number) => {
    setWishList((prev) => {
      const updatedWishList = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]; 
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
      return updatedWishList;
    });
  };

  return (
    <Box sx={{ padding: 4 }} id="category-list">

        {/* breadcrumbs section */}
      <CustomBreadcrumbs items={breadcrumbItems}></CustomBreadcrumbs>
      <Typography variant="h4" className="Top-heading">
        View All Categories
      </Typography>

       {/* Display Loader when isLoading is true
       {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <MoonLoader color="#000" loading={isLoading} size={50} />
        </Box>
      )} */}
      
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
          <Grid>
            <MuiLink
              className="categories-link"
              href={"/categories/subcategories1"}
              onClick={handleLinkClick}
            >
              Category 1
            </MuiLink>
          </Grid>
          <Grid>
            <MuiLink
              className="categories-link"
              href={"/categories/subcategories2"}
              onClick={handleLinkClick}
            >
              Category 2
            </MuiLink>
          </Grid>
          <Grid>
            <MuiLink
              className="categories-link"
              href={"/categories/subcategories3"}
              onClick={handleLinkClick}
            >
              Category 3
            </MuiLink>
          </Grid>
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
          gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
        }}
      >
        {products.map((product) => (
          <Grid className={"card-item"} key={product.id}>
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
                <MuiLink href={`/pages/${product.id}`} onClick={handleLinkClick} >
                  <CardMedia
                    sx={{
                      height: "100%",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                    image={product.image}
                    title={product.title}
                  />
                </MuiLink>
              </Box>

              {/* Product Info */}
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography sx={{ color: "gray" }} component="div">
                  {product.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ${product.price}
                </Typography>
              </CardContent>

              {/* Add to Cart Button */}
              <Typography variant="h4">
                <Button
                  onClick={() =>
                    handleAddToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })
                  }
                  sx={{
                    background: "black",
                    color: "white",
                    padding: "5px 5px",
                    fontWeight: "bold",
                      "&:hover": {
                        background:"#a8a5a5",
                      },
                  }}
                >
                  Add
                </Button>
              </Typography>
            </Card>
          </Grid>
        ))}

      {/* Loader Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
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
  );
};

export default Categories;
