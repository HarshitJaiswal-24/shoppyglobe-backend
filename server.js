import express from "express";
import mongoose from "mongoose";

import cartRoutes from "./Routes/cartRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";

const app = express();   //
app.use(express.json()); // middleware to parse JSON

// ✅ Mount routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

// ✅ Start server
app.listen(3100, () => {
  console.log("Server is running on port 3100");
});

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://harshitrjaiswal:Harshit%4024@cluster0.bjvukco.mongodb.net/shoppyglobe");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connection is successful");
});
db.on("error", () => {
  console.log("Connection is not successful");
});
