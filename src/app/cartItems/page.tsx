import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, getAllCartProduct, updateCartProduct } from "@/store/productSlice";
import { CartDetails } from "@/interface";
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from "@/store/store";

const CartItem: React.FC = () => {
    const dispatch = useDispatch<any>();
    const [cartItems, setCartItems] = useState<CartDetails[]>([]);

    const userId = window.localStorage.getItem("id");
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const handleDeleteCart = async (id: number) => {
        try {
            const res = await dispatch(deleteCartProduct(id));
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateCartQty = async (addOrRemove: string, id: number, item: any) => {
        try {
            const localUserId = userId ? parseInt(userId) : 0;
            var quantity = item.quantity;
            var qty = addOrRemove === "add" ? quantity += 1 : quantity -= 1;
            const { payload } = await dispatch(updateCartProduct({ cartId: id, value: { productId: item.productId, userId: localUserId, quantity: qty } }))
            fetchData();
        }
        catch (error) {
            console.log(error);
        }
    }

    const calculateTotalAmount = (items: CartDetails[]) => {
        const total = items.reduce((sum, item) => sum + item.productTotalAmount, 0);
        setTotalAmount(total);
    };

    const fetchData = async () => {
        if (userId) {
            const { payload } = await dispatch(getAllCartProduct(parseInt(userId)))
            setCartItems(payload.result);
            calculateTotalAmount(payload.result);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {cartItems && cartItems.map((item: CartDetails) => {
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
                                src={`${process.env.NEXT_PUBLIC_APP_API_IMAGE_URL}${item.image.replace(/^~\//, '')}`}
                                alt={item.productName}
                                style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: 16 }}
                            />
                        </Box>

                        {/* Title and Price Section */}
                        <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column", marginLeft: 2, marginBottom: 1 }}>
                            <Typography variant="h6" noWrap sx={{
                                display: '-webkit-box',
                                '-webkit-line-clamp': '1',
                                '-webkit-box-orient': 'vertical',
                                overflow: 'hidden'
                            }}>{item.productName}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                                <Typography variant="body2" sx={{ marginTop: 2 }}>
                                    Price: ${item.productPrice}
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: 2, marginLeft: 5 }}>
                                    Total Amount: ${item.productTotalAmount}
                                </Typography>
                            </Box>

                            {/* Button Section */}
                            <Box sx={{ display: "flex", marginTop: 2, marginLeft: 0 }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleUpdateCartQty("remove", item.id, item)}
                                    sx={{ background: "gray", cursor: item.quantity <= 1 ? "not-allowed" : "pointer", color: "white", '&:hover': { background: '#ada7a7' } }}
                                >
                                    -
                                </Button>
                                <Typography variant="body1" sx={{ marginLeft: 1, marginRight: 1, display: 'flex', alignItems: 'center' }}>
                                    {item.quantity}
                                </Typography>
                                <Button
                                    sx={{ background: "gray", color: "white", '&:hover': { background: '#ada7a7' } }}
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleUpdateCartQty("add", item.id,
                                        {
                                            productId: item.productId
                                            , quantity: item.quantity
                                        })}
                                >
                                    +
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => handleDeleteCart(item.id)}
                                    sx={{ color: 'gray', marginLeft: 7, '&:hover': { color: '#f10606' } }} >
                                    <DeleteIcon />
                                </Button>
                            </Box>
                        </Box>
                    </Box>)
            })}
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Total Amount: ${totalAmount}
            </Typography>
        </>
    );
};

export default CartItem;
