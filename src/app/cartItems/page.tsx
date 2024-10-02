import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux"; 
import { addToCart, deleteFromCart, removeFromCart } from "../../store/cartSlice";
import { CartItemType } from "../../store/cartSlice";
import DeleteIcon from '@mui/icons-material/Delete';

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
                borderBottom: "1px solid #777474",
            }}
        >
            {/* Image Section */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: { xs: 2, sm: 0 } }}>
                <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
            </Box>

            <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column", marginLeft: 2 , marginBottom:1}}>
            {/* Title and Price Section */}
                <Typography variant="h6" noWrap>{item.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                    <Typography variant="body2" sx={{ marginRight: 2 }}>
                        Price: ${item.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                        Total: ${(item.quantity * item.price).toFixed(2)}
                    </Typography>
                </Box>

                {/* Button Section */}
                <Box sx={{ display: "flex",marginTop: 2, marginLeft: 0}}>
                <Button
                        variant="contained"
                        size="small"
                        onClick={() => dispatch(removeFromCart(item.id))} 
                        sx={{background:"gray",color:"white",'&:hover': { background: '#ada7a7' }}}
                        disabled={item.quantity <= 0}
                    >
                        -
                    </Button>
                    <Typography variant="body1" sx={{ marginLeft: 1, marginRight: 1,display: 'flex', alignItems: 'center' }}>
                        {item.quantity}
                    </Typography>
                    <Button
                        sx={{background:"gray",color:"white",'&:hover': { background: '#ada7a7' }}}
                        variant="contained"
                        size="small"
                        onClick={() => dispatch(addToCart(item))} 
                    >
                        +
                    </Button>
                    <Button 
                        variant="text" 
                        onClick={() => dispatch(deleteFromCart(item.id))}
                        sx={{color:'gray', marginLeft: 7, '&:hover': { color: '#f10606' }}} >
                            <DeleteIcon />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;
