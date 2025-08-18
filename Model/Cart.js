import mongoose from "mongoose";   // Import mongoose for schema & DB operations

// ---------------- CART SCHEMA ----------------
const cartSchema = new mongoose.Schema({
  // Each cart item references a product (relationship between Cart & Product collection)
  productId: {
    type: mongoose.Schema.Types.ObjectId,  // Stores the ObjectId of a product
    ref: "Product",                        // Refers to the "Product" model (for population/join)
    required: true                         // Must have a productId
  },

  // Quantity of the product in the cart
  quantity: {
    type: Number,       // Only numbers allowed
    required: true,     // Can't be empty
    default: 1          // Default value = 1 item
  }
});

// Create the Cart model from schema
const Cart = mongoose.model("Cart", cartSchema);

// Export it so it can be used in controllers/routes
export default Cart;
