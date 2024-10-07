'use client';
import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { useDispatch } from "react-redux";
import { CartItemType } from "@/store/cartSlice";
import { addToCartProduct, getProductsById } from "@/store/productSlice";
import { useParams } from "next/navigation";
import { Products } from "@/interface";

interface PageParams {
  params: {
    productId: number;
  };
}

const DescriptionTextSection: React.FC = () => (
  <Paper
    sx={{
      marginTop: 4,
      padding: 3,
      borderRadius: 2,
      background: "transparent",
      boxShadow: "none",
      maxWidth: { xs: "100%", sm: "300px", md: "400px" },
    }}
  >
    <Typography
      variant="h6"
      gutterBottom
      sx={{ color: "#333", textTransform: "uppercase", fontWeight: "bold" }}
    >
      Why Choose Us?
    </Typography>
    <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.6 }}>
      The Medium Tote is an all day, everyday type of bag that’s ready for
      anything you want or need. Crafted in full-grain leather, this tote
      features a chunky top zip closure, the namesake debossed branding.
    </Typography>
  </Paper>
);

const initialValues = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  categoryName: "",
  subCategoryName: "",
  image: "",
  isActive: false,
}

const Bags: React.FC<PageParams> = () => {

  const dispatch = useDispatch<any>();
  const { productId } = useParams<{ productId: string }>();
  const [products, setProducts] = useState<Products>(initialValues);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'SubCategories', href: '/categories/subCategories' },
    { label: 'Product Details' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await dispatch(getProductsById(Number(productId)))
      setProducts(res.payload.result);
    }
    fetchProducts();
  }, [productId]);

  const handleAddToCart = async () => {
    const userId = 1;
    try {
      const res = await dispatch(addToCartProduct({ productId: products.id, userId, quantity: 1 }))
      if(res?.payload?.result == 2){
        alert(res?.payload?.message ?? "Already added in cart")
      }
    } catch (errors) {
      console.log(errors)
    }
  }

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 4 } }}>
        <CustomBreadcrumbs items={breadcrumbItems}></CustomBreadcrumbs>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <Image
              height="300"
              width="700"
              alt={products.name}
              src={`${process.env.NEXT_PUBLIC_APP_API_IMAGE_URL}${products.image && products.image.replace(/^~\//, '')}`}
              style={{ maxWidth: "100%", height: "auto" }}
              unoptimized
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{
            textAlign: 'center',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", letterSpacing: "5px", textTransform: "uppercase", fontSize: { xs: "24px", md: "35px" } }}>
              {products.name}
            </Typography>
            <Typography component="div" sx={{
                      letterSpacing: "1.5px",
                      fontSize: { xs: "24px", md: "20px" } ,
                      overflow: 'hidden'
                    }}>
                      {products.description}
                    </Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: "20px", md: "24px" } }}>${products.price}.00</Typography>
            <Typography variant="h4">
              <Button onClick={handleAddToCart}
                sx={{
                  background: "black",
                  color: "white",
                  padding: { xs: "10px 30px", md: "10px 50px" },
                  fontWeight: "bold",
                  fontSize: { xs: "14px", md: "16px" },
                  marginTop: 2,
                }}
              >
                <ShoppingCartIcon
                  sx={{ color: "#fff", marginRight: "10px" }}
                />
                Add To Cart
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: "0 10%" }}>
          <Grid size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <DescriptionTextSection />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <DescriptionTextSection />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <DescriptionTextSection />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Bags;
