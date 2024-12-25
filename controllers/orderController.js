const Order = require("../models/Order");

// Place an Order
const placeOrder = async (req, res) => {
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
};

// Get Order Summary
const getOrderSummary = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Calculate Total Revenue
const calculateRevenue = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);
    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrderSummary,
  calculateRevenue,
};
