import Cart from "../Model/Cart.js";       // Import Cart model (MongoDB schema for cart items)
import Product from "../Model/Product.js"; // Import Product model (to check product existence)

//// ---------------- ADD TO CART ----------------
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;   // Extract productId and quantity from request body

  // Validate inputs
  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required." });
  }

  try {
    // Check if product exists in Product collection
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create new cart item
    const newCartItem = new Cart({ productId, quantity });
    await newCartItem.save();   // Save it to the database

    // Send success response
    res.status(201).json({ message: "Product added to cart", cartItem: newCartItem });
  } catch (err) {
    // Handle errors (DB, server, etc.)
    res.status(500).json({ message: "Failed to add product to cart", error: err.message });
  }
};

//// ---------------- UPDATE CART QUANTITY ----------------
export const updateCartQuantity = async (req, res) => {
  const { id } = req.params;         // Get cart item _id from URL parameter
  const { quantity } = req.body;     // Get new quantity from request body

  // Validate quantity
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Valid quantity is required" });
  }

  try {
    // Find the cart item by _id and update quantity
    const updatedCart = await Cart.findByIdAndUpdate(
      id,               // Find cart item by ID
      { quantity },     // Update only the quantity field
      { new: true }     // Return the updated document
    );

    // If item does not exist
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Send success response with updated cart
    res.json({ message: "Cart quantity updated", updatedCart });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: "Error updating cart item", error: err.message });
  }
};

//// ---------------- DELETE CART ITEM ----------------
export const deleteCartItem = async (req, res) => {
  const { id } = req.params;    // Get cart item _id from URL parameter   

  try {
    // Find and delete the cart item
    const deletedItem = await Cart.findByIdAndDelete(id);

    // If item does not exist
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Send success response with deleted item info
    res.json({ message: "Cart item deleted successfully", deletedItem });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: "Failed to delete cart item", error: err.message });
  }
};
