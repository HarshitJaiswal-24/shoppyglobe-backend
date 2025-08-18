import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  quantity:Number
});

const Product = mongoose.model("Products", productSchema);

export default Product;