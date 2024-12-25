const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const createError = require("http-errors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
dbConnect();

// Routes
app.use("/api/orders", orderRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  if (err instanceof createError.HttpError) {
    return res.status(err.status || 500).json({
      message: err.message || "Something went wrong",
      errors: err.errors || null,
    });
  }

  // If the error isn't an HTTP error, send a generic 500 error
  res.status(500).json({
    message: "Something went wrong on the server",
    errors: err.message || null,
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
