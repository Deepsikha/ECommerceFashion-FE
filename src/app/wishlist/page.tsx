"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { RootState } from "@/store/store";

const Wishlist: React.FC = () => {
  const router = useRouter();
  const products = useSelector((state: RootState) => state.product.items); 
  const [wishList, setWishList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage after component mounts
  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList)); 
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Typography>Loading wishlist...</Typography>;
  }

  // Filter products based on the wishlist
  const filteredProducts = products.filter((product) =>
    wishList.includes(product.id)
  );

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
          gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
        }}
      >
        {filteredProducts.length === 0 ? (
          <Typography>No items in your wishlist.</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 4,
            }}
          >
            {filteredProducts.map((product) => (
              <>
                <Grid className={"card-item"}>
                  <Card key={product.id} sx={{ maxWidth: 345 }}>
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
                        sx={{ color: "black" }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>
                    <Typography sx={{ textAlign: "center", marginBottom: 2 }}>
                      <Button
                        sx={{
                          background: "black",
                          color: "white",
                          padding: "5px 5px",
                          fontWeight: "bold",
                        }}
                        onClick={() => router.push(`/pages/${product.id}`)}
                      >
                        View Details
                      </Button>
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
