import CustomBreadcrumbs from "@/components/Breadcrumbs";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const Categories: React.FC = () => {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Categories", href: "/categories" },
        { label: "All Categories" },
    ];
    return (
        <>
            <Box sx={{ padding: 4 }} id="category-list">
                <CustomBreadcrumbs items={breadcrumbItems}></CustomBreadcrumbs>
                <Typography variant="h4" className="Top-heading">
                    View All Categories
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
                            <Link className="categories-link" href={"/categories/subcategories1"}>
                                Category 1
                            </Link>
                        </Grid>
                        <Grid>
                            <Link className="categories-link" href={"/categories/subcategories2"}>
                                Category 2
                            </Link>
                        </Grid>
                        <Grid>
                            <Link className="categories-link" href={"/categories/subcategories3"}>
                                Category 3
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Grid
                    container
                    spacing={4}
                    sx={{ margin: "50px 50px", rowGap: "50px", justifyContent: "center" }}
                >
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    height: 500,
                                    position: "relative",
                                    width: "100%",
                                    overflow: "hidden",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                                image="/images/Bag4.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                className="card-image"
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag2.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag3.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag5_1.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag5.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag6.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag7.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag8.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid className={"card-item"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 500,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                                image="/images/Bag9.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Categories;
