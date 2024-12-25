const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/orderManagement", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("Database connection error:", err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
