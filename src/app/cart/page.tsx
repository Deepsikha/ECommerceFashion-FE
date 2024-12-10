"use client";
import { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import CartItem from "../cartItems/page";
import { CartDetails } from "@/interface";

type Props = {
  cartItems: CartDetails[];
};

const Cart: React.FC<Props> = ({ cartItems }) => {
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
    // Convert totalAmount to a number for the arithmetic operation
    var totalAmount = 100;
    const amountInRupees = totalAmount * 100;

    const options = {
      key: "rzp_test_LAGWrBltvmtMrE",
      amount: amountInRupees * 83.7,
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
    <Box
      sx={{
        padding: "32px 0 32px 15px",
        maxWidth: 600,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Your Cart
      </Typography>
      <div className="product-list">
        <CartItem />
      </div>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {/* Total: ${calculateTotal(cartItems).toFixed(2)} */}
      </Typography>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
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
