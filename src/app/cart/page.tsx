import React, { useEffect } from 'react';
import { Button, Typography, Box } from "@mui/material";
import { CartItemType } from "../../store/cartSlice";
import CartItem from "../cartItems/page";

type Props = {
    cartItems?: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems = [] }) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    // Load Razorpay script dynamically
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Function to initiate Razorpay payment
    const handleCheckout = async () => {
        const totalAmount = calculateTotal(cartItems) || 0; 

        // Convert totalAmount to a number for the arithmetic operation
        const amountInRupees = totalAmount * 100; 

        const options = {
            key: "rzp_test_LAGWrBltvmtMrE", 
            amount: (amountInRupees * 83.70),
            currency: "INR",
            name: "ECommerce Fashion",
            description: "Payment for your order",
            handler: function (response: any) {
                alert(response.razorpay_payment_id); 
            },
            prefill: {
                name: "Customer",
                email: "customer@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Customer Address",
            },
            theme: {
                color: "#F37254",
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h5" sx={{marginBottom:2, fontWeight:'bold'}}>
                Your Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography variant="body1" align='center' sx={{marginTop:2}}>No items in cart.</Typography>
            ) : (
                cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))
            )}
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Total: ${calculateTotal(cartItems).toFixed(2)}
            </Typography>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            {cartItems.length > 0 && (
                <Button
                    variant="contained"
                    color="success"
                    sx={{ marginTop: 2 }}
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </Button>
            )}
            </Box>
        </Box>
    );
};

export default Cart;
