'use client'
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";


const products=[
    { id: 1, title: "Product1", image: "/images/Bag1.jpg", price: 125},
    { id: 2, title: "Product2", image: "/images/Bag2.jpg", price: 125},
    { id: 3, title: "Product3", image: "/images/Bag3.jpg", price: 125},
    { id: 4, title: "Product4", image: "/images/Bag4.jpg", price: 125},
    { id: 5, title: "Product5", image: "/images/Bag5.jpg", price: 125},
    { id: 6, title: "Product6", image: "/images/Bag6.jpg", price: 125},
    { id: 7, title: "Product7", image: "/images/Bag7.jpg", price: 125},
    { id: 8, title: "Product8", image: "/images/Bag8.jpg", price: 125},
    { id: 9, title: "Product9", image: "/images/Bag9.jpg", price: 125},
]

interface WishList {
    id: number,
    wishListed:boolean
}

const Categories: React.FC = () => {
    const [wishList,setWishList]=useState<WishList[]>([]);
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Categories", href: "/categories" },
        { label: "SubCategories", href: "/categories/subCategories" },
        { label: "All Sub Categories" },
    ];

    function handelWishList(id:number) {
        console.log("wishList>>>>",wishList)
        setWishList((prev)=>{
            const existingItem = prev.find(item => item.id === id);
                if(existingItem){
                    return prev.map(item => 
                        item.id === id ? { ...item, wishListed: !item.wishListed } : item)
                }else{
                    return [...prev, { id, wishListed: true }];
                }
            }
        );
    }

    const isWishListed=(id:number)=>{
        const item = wishList.find(item=>item.id === id);
        return item ? item.wishListed : false;
    }
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
                            <Link className="categories-link" href={"/categories/subcategories"}>
                                Sub Category 1
                            </Link>
                        </Grid>
                        <Grid>
                            <Link className="categories-link" href={"/categories/subcategories"}>
                                Sub Category 2
                            </Link>
                        </Grid>
                        <Grid>
                            <Link className="categories-link" href={"/categories/subcategories"}>
                                Sub Category 3
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Grid
                    container
                    spacing={4}
                    sx={{ margin: "50px 50px", rowGap: "50px", display: 'grid' , gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )' }}
                >
                    {products.map((product,index)=>{
                            return(
                                <>
                                <Grid className={"card-item"} key={`category-${index}`}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <IconButton color="inherit" className="Card-wish-icon" onClick={()=>handelWishList(product.id)}>
                                            <FavoriteIcon sx={{ color: isWishListed(product.id) ? '#ff3d3d' : '#ffffff' }} />
                                        </IconButton>
                                        <Box sx={{
                                            height: 500,
                                            position: "relative",
                                            width: "100%",
                                            overflow: "hidden",
                                        }}>
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
                                                    title="green iguana"
                                                />
                                            </Link>
                                        </Box>
                                        <CardContent sx={{ textAlign: "center" }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>${product.price}
                                            </Typography>
                                        </CardContent>
                                <Typography variant="h4">
                                    <Button
                                        sx={{
                                            background: "black",
                                            color: "white",
                                            padding: "5px 5px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Add To Cart
                                    </Button>
                                </Typography>
                                    </Card>
                                </Grid>
                                </>
                            )
                        })}
                </Grid>
            </Box>
        </>
    );
};

export default Categories;
