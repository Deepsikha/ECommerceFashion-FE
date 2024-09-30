import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux"; 
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { CartItemType } from "../../store/cartSlice";

type Props = {
    item: CartItemType;
};

const CartItem: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch(); 

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                borderBottom: "1px solid #ccc",
            }}
        >
            {/* Image Section */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: { xs: 2, sm: 0 } }}>
                <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: 16 }}
                />
            </Box>

            {/* Title and Price Section */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Price: ${item.price.toFixed(2)} 
                </Typography>
            </Box>

            {/* Button Section */}
            <Box sx={{ display: "flex", alignItems: "center" ,marginLeft:2}}>
                <Button
                    sx={{background:"gray",color:"black"}}
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(addToCart(item))} 
                >
                    +
                </Button>
                <div style={{marginLeft:10}}>
                {item.quantity}
                </div>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(removeFromCart(item.id))} 
                    sx={{ marginLeft: 1 ,background:"gray",color:"black"}}
                    disabled={item.quantity <= 0}
                >
                    -
                </Button>
            </Box>
        </Box>
    );
};

export default CartItem;
