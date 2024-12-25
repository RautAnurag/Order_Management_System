const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderSummary,
  calculateRevenue,
} = require("../controllers/orderController");

// Route to calculate total revenue
router.get("/revenue", calculateRevenue);

// Route to place an order
router.post("/", placeOrder);

// Route to get order summary
router.get("/:id", getOrderSummary);

module.exports = router;
