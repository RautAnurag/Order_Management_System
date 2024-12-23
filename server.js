const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/orderManagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and Model
const orderSchema = new mongoose.Schema({
  productName: String,
  quantity: { type: Number, required: true, min: 1 },
  pricePerUnit: { type: Number, required: true, min: 1 },
  amount: Number,
  discount: Number,
  finalAmount: Number,
  timestamp: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Routes

// Place an Order
app.post("/api/orders", async (req, res) => {
  try {
    const { productName, quantity, pricePerUnit } = req.body;

    if (!productName || quantity <= 0 || pricePerUnit <= 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const amount = quantity * pricePerUnit;
    let discount = 0;

    // Apply discount rules
    if (amount > 10000) discount += amount * 0.1;
    if (quantity > 5) discount += 500;

    const finalAmount = amount - discount;

    const order = new Order({
      productName,
      quantity,
      pricePerUnit,
      amount,
      discount,
      finalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Order Summary
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calculate Total Revenue
app.get("/api/revenue", async (req, res) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);
    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
