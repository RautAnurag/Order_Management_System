const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
dbConnect();

// Routes
app.use("/api/orders", orderRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
