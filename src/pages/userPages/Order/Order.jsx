import { useState, useContext } from "react";
import { ProductContext } from "../../../Provider/ProductContext";
import axios from "axios";
import { TextField, Button, Grid2, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Order() {
  const { initialCartItems, setInitialCartItems, setOrderItems, amount } =
    useContext(ProductContext);

  const initialValue = {
    name: "",
    address: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const istTime = currentDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    try {
      // Replace with your payment processing API
      const userId = localStorage.getItem("userId");
      const response = await axios.post("http://localhost:5000/order", {
        userId: userId,
        shipping: formData,
        date: istTime,
        amount: amount,
        ordered: initialCartItems,
      });
      setOrderItems((prev) => [
        ...prev,
        {
          id: response.data.id,
          shipping: formData,
          date: istTime,
          ordered: initialCartItems,
          amount: amount,
        },
      ]);

      setSuccess(true);
      alert("Payment successfully completed");

      setInitialCartItems([]);
      setFormData(initialValue);

      const cartResponse = await axios.get(
        `http://localhost:5000/cart?userId=${userId}`
      );
      const itemIds = cartResponse.data.map((item) => item.id);

      for (const cartId of itemIds) {
        const deleteCart = await axios.delete(
          `http://localhost:5000/cart/${cartId}`
        );
        console.log(deleteCart);
      }

      navigate("/");
      return;
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
    }
  };
  console.log(success, error);
  if (amount == 0) {
    return (
      <div className="order-container ">
        <h2 className="text-warning">Sorry You Have Not Selected any Item! </h2>
        <h2 className="text-warning"> Cart is Empty</h2>
      </div>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Payment Information
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Full Name and Address */}
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              onChange={handleChange}
              name="name"
              required
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              onChange={handleChange}
              required
              name="address"
            />
          </Grid2>

          {/* Card Name and Card Number */}
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name on Card"
              variant="outlined"
              onChange={handleChange}
              name="cardName"
              required
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CardNumber"
              variant="outlined"
              onChange={handleChange}
              required
              name="cardNumber"
              type="number"
            />
          </Grid2>

          {/* Expiry Date and CVV */}
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiry Date (MM/YY)"
              variant="outlined"
              onChange={handleChange}
              name="expiryDate"
              required
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              variant="outlined"
              required
              type="number"
              name="cvv"
              onChange={handleChange}
            />
          </Grid2>
          <h2>
            Total Amount: <span className="text-success">{amount} $</span>
          </h2>

          {/* Submit Button */}
          <Grid2 item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit Payment
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}

export default Order;
