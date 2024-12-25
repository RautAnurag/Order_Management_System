const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: String,
  quantity: { type: Number, required: true, min: 1 },
  pricePerUnit: { type: Number, required: true, min: 1 },
  amount: Number,
  discount: Number,
  finalAmount: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
