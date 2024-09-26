import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

const WishList: React.FC = () => {
    return (
        <>
            <Box>
                <Grid container>
                    <Grid
                        size={12}
                        sx={{ textAlign: "center", margin: "10px 10px 20px 10px" }}
                    >
                        <Typography
                            className="heading"
                            variant="body2"
                            sx={{ margin: "15px 0" }}
                        >
                            {" "}
                            Register or login to save your Wishlist and access it at any time,
                            from any device
                        </Typography>
                        <Button
                            sx={{
                                background: "black",
                                color: "white",
                                padding: "10px 50px",
                                fontWeight: "bold",
                                margin: "15px 0",
                            }}
                        >
                            Save your items
                        </Button>
                        <Grid
                            container
                            spacing={4}
                            sx={{
                                margin: "50px 50px",
                                rowGap: "50px",
                                justifyContent: "center",
                            }}
                        >
                            <Grid className={"card-item"}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 250 }}
                                        image="/images/Bag4.jpg"
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            Lizards are a widespread group of squamate reptiles, with
                                            over 6,000 species, ranging across all continents except
                                            Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid className={"card-item"}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 250 }}
                                        image="/images/Bag2.jpg"
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            Lizards are a widespread group of squamate reptiles, with
                                            over 6,000 species, ranging across all continents except
                                            Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid className={"card-item"}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 250 }}
                                        image="/images/Bag3.jpg"
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            Lizards are a widespread group of squamate reptiles, with
                                            over 6,000 species, ranging across all continents except
                                            Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default WishList;
