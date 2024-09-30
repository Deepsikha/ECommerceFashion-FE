'use client';
import React from "react";
import { Box, Button, Paper, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { useDispatch } from "react-redux";
import { addToCart, CartItemType } from "@/store/cartSlice";

interface PageParams {
    params: {
        productId: string;
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
            maxWidth: "200px",
            width: "200px",
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

const Bags: React.FC<PageParams> = ({ }) => {
    const dispatch = useDispatch();
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Categories', href: '/categories' },
        { label: 'SubCategories', href: '/categories/subCategories' },
        { label: 'Product Details' },
    ];

    const handleAddToCart = (item: CartItemType) => {
        dispatch(addToCart(item));
    };

    const item: CartItemType = {
        id: 1,
        title: "The Logo Chain Shoulder Strap",
        price: 450.00,
        quantity: 1,
        image: '/images/bag4.jpg', 
    };

    return (
        <Box sx={{ padding: 4 }}>
            <CustomBreadcrumbs items={breadcrumbItems}></CustomBreadcrumbs>
            <Grid container spacing={2}>
                <Grid size={6} sx={{ textAlign: "center" }}>
                    <Image
                        height="700"
                        width="700"
                        alt="Bag for women."
                        src="/images/bag4.jpg"
                    />
                </Grid>
                <Grid size={6} sx={{ textAlign: "center", alignContent: "center" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", letterSpacing: "5px", textTransform: "uppercase", fontSize: "35px" }}>
                        The Logo Chain Shoulder Strap
                    </Typography>
                    <Typography variant="h4">$450.00</Typography>
                    <Typography variant="h4">
                        <Button
                            onClick={() => handleAddToCart(item)}
                            sx={{
                                background: "black",
                                color: "white",
                                padding: "10px 50px",
                                fontWeight: "bold",
                                marginTop: 2,
                            }}
                        >
                            Add To Cart
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ padding: "0 20%" }}>
                <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
                    <DescriptionTextSection />
                </Grid>
                <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
                    <DescriptionTextSection />
                </Grid>
                <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
                    <DescriptionTextSection />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Bags;
