const { validationResult } = require("express-validator");
const createError = require("http-errors");
const Order = require("../models/Order");

// Place an Order
const placeOrder = async (req, res, next) => {
  const errors = validationResult(req); // Check if there are validation errors
  if (!errors.isEmpty()) {
    return next(createError(400, "Validation failed", { errors: errors.array() }));
  }

  try {
    const { productName, quantity, pricePerUnit } = req.body;

    if (!productName || quantity <= 0 || pricePerUnit <= 0) {
      return next(createError(400, "Invalid input data"));
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
    next(createError(500, err.message));
  }
};

// Get Order Summary
const getOrderSummary = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(createError(404, "Order not found"));
    res.json(order);
  } catch (err) {
    next(createError(500, err.message));
  }
};

// Calculate Total Revenue
const calculateRevenue = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);
    res.json({ totalRevenue });
  } catch (err) {
    next(createError(500, err.message));
  }
};

module.exports = {
  placeOrder,
  getOrderSummary,
  calculateRevenue,
};
