"use client";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart, CartItemType } from "@/store/cartSlice";

const products = [
  {
    id: 1,
    title: "Product1",
    image: "/images/Bag1.jpg",
    price: 125,
    description: "Stylish handbag perfect for any occasion.",
  },
  {
    id: 2,
    title: "Product2",
    image: "/images/bag2.jpg",
    price: 125,
    description: "Elegant handbag made from premium materials.",
  },
  {
    id: 3,
    title: "Product3",
    image: "/images/bag3.jpg",
    price: 125,
    description: "Spacious handbag with multiple compartments.",
  },
  {
    id: 4,
    title: "Product4",
    image: "/images/bag4.jpg",
    price: 125,
    description: "Fashionable bag with a sleek design.",
  },
  {
    id: 5,
    title: "Product5",
    image: "/images/bag5.jpg",
    price: 125,
    description: "Trendy handbag with modern accents.",
  },
  {
    id: 6,
    title: "Product6",
    image: "/images/bag6.jpg",
    price: 125,
    description: "Compact handbag suitable for casual outings.",
  },
  {
    id: 7,
    title: "Product7",
    image: "/images/bag7.jpg",
    price: 125,
    description: "Classic handbag with a timeless look.",
  },
  {
    id: 8,
    title: "Product8",
    image: "/images/bag8.jpg",
    price: 125,
    description: "Luxury handbag for special occasions.",
  },
  {
    id: 9,
    title: "Product9",
    image: "/images/bag9.jpg",
    price: 125,
    description: "Chic handbag that combines style and functionality.",
  },
];
interface WishList {
  id: number;
  wishListed: boolean;
}

const Categories: React.FC = () => {
  const dispatch = useDispatch();

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

  const [wishList, setWishList] = useState<WishList[]>([]);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "SubCategories", href: "/categories/subCategories" },
    { label: "All Sub Categories" },
  ];

  function handelWishList(id: number) {
    console.log("wishList>>>>", wishList);
    setWishList((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, wishListed: !item.wishListed } : item
        );
      } else {
        return [...prev, { id, wishListed: true }];
      }
    });
  }

  const isWishListed = (id: number) => {
    const item = wishList.find((item) => item.id === id);
    return item ? item.wishListed : false;
  };
  
  return (
    <>
      <Box sx={{ padding: 4 }} id="subcategory-list">
        <CustomBreadcrumbs items={breadcrumbItems}></CustomBreadcrumbs>
        <Typography variant="h4" className="Top-heading">
          View All Sub Categories
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
            <Grid>
              <Link
                className="categories-link"
                href={"/categories/subcategories"}
              >
                Sub Category 1
              </Link>
            </Grid>
            <Grid>
              <Link
                className="categories-link"
                href={"/categories/subcategories"}
              >
                Sub Category 2
              </Link>
            </Grid>
            <Grid>
              <Link
                className="categories-link"
                href={"/categories/subcategories"}
              >
                Sub Category 3
              </Link>
            </Grid>
          </Grid>
        </Box>
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
          {products.map((product, index) => {
            return (
              <>
                <Grid className={"card-item"} key={`category-${index}`}>
                  <Card sx={{ maxWidth: 345 }}>
                    <IconButton
                      color="inherit"
                      className="Card-wish-icon"
                      onClick={() => handelWishList(product.id)}
                    >
                      <FavoriteIcon
                        sx={{
                          color: isWishListed(product.id)
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
                          image={product.image}
                          title={product.title}
                        />
                      </Link>
                    </Box>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography sx={{ color: "gray" }} component="div">
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
                        }}
                      >
                        Add
                      </Button>
                    </Typography>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Categories;
