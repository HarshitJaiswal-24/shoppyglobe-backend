import Product from "../Model/Product.js";   // Import the Product model

//// ---------------- CREATE PRODUCT ----------------
export const createProduct = async (req, res) => {
  const { name, price, description, quantity } = req.body;   // Extract product details from request body

  // Basic validation (Mongoose schema will also validate)
  if (!name || !price || !description || !quantity) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create new product instance
    const product = new Product({ name, price, description, quantity });
    await product.save();   // Save product to database

    // Send success response with created product
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    // Handle errors (DB or server)
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

//// ---------------- GET ALL PRODUCTS ----------------
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from DB
    const products = await Product.find();

    // Send them in response
    res.json(products);
  } catch (err) {
    // Handle server/DB errors
    res.status(500).json({ message: "Server Error", error: err });
  }
};

//// ---------------- GET PRODUCT BY ID ----------------
export const getProductById = async (req, res) => {
  const { id } = req.params;   // Extract product ID from URL

  try {
    // Find product by its ID
    const product = await Product.findById(id);

    // If no product found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the product details
    res.json(product);
  } catch (err) {
    // Handle errors (invalid ID format or DB issues)
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
