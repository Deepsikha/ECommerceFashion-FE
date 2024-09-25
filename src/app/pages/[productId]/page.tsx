import React from "react";
import { Box, Breadcrumbs, Button, Link, Paper, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";

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
const Bags: React.FC<PageParams> = ({
    params,
}: {
    params: { productId: string };
}) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "0 0 25px 105px" }}>
                <Link underline="hover" color="inherit" href="/" sx={{ fontSize: "10px" }}>
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                    sx={{ fontSize: "10px" }}
                >
                    Category
                </Link>
                <Typography sx={{ color: "text.primary", fontSize: "10px" }}>BREADCRUMB</Typography>
            </Breadcrumbs>
            <Grid container spacing={2}>
                <Grid
                    size={6}
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 700,
                            width: 700,
                        }}
                        alt="Bag for women."
                        src="/images/bag1.jpg"
                    />
                </Grid>
                <Grid
                    size={6}
                    sx={{
                        textAlign: "center",
                        alignContent: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold", letterSpacing: "5px", textTransform: "uppercase", fontSize: "35px" }}>
                        The
                        Logo Chain Shoulder Strap
                    </Typography>
                    <Typography variant="h4">$450.00</Typography>
                    <Typography variant="h4">
                        <Button
                            sx={{
                                background: "black",
                                color: "white",
                                padding: "10px 50px",
                                fontWeight: "bold",
                            }}
                        >
                            Add To Cart
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ padding: "0 20%" }}>
                <Grid
                    size={4}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <DescriptionTextSection />
                </Grid>
                <Grid
                    size={4}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <DescriptionTextSection />
                </Grid>
                <Grid
                    size={4}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <DescriptionTextSection />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Bags;
