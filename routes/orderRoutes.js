const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  placeOrder,
  getOrderSummary,
  calculateRevenue,
} = require("../controllers/orderController");

// Validation middleware for placing an order
const validateOrder = [
  body("productName")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string"),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("pricePerUnit")
    .isFloat({ gt: 0 })
    .withMessage("Price per unit must be a positive number"),
];

// Route to calculate total revenue
router.get("/revenue", calculateRevenue);

// Route to place an order with validation
router.post("/", validateOrder, placeOrder);

// Route to get order summary
router.get("/:id", getOrderSummary);

module.exports = router;
