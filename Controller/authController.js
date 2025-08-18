import bcrypt from "bcryptjs";                       // Library for hashing and comparing passwords
import jwt from "jsonwebtoken";                      // Library for generating and verifying JWT tokens
import User from "../Model/User.js";                 // Import User model (MongoDB schema)

const SECRET_KEY = "your_jwt_secret";                // Secret key used for signing JWT tokens
   
// ---------------- REGISTER CONTROLLER ----------------
export const register = async (req, res) => {                   
  const { email, password } = req.body;              // Extract email and password from request body

  try {
    // Check if user already exists in DB
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });  

    // Hash the password before saving (10 = salt rounds)
    const hash = await bcrypt.hash(password, 10);

    // Create new user in MongoDB
    const newUser = await User.create({ email, password: hash });                 

    // Send success response with new user ID
    res.status(201).json({ message: "User registered", userId: newUser._id });  
  } catch (err) {
    // Handle server or DB errors
    res.status(500).json({ message: "Error registering", error: err.message });
  }
};

// ---------------- LOGIN CONTROLLER ----------------
export const login = async (req, res) => {
  const { email, password } = req.body;              // Extract email and password from request body

  try {
    // Check if user exists in DB
    const user = await User.findOne({ email });  
    if (!user) return res.status(400).json({ message: "Invalid email" });

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT token valid for 1 hour
    const token = jwt.sign(
      { userId: user._id },                          // Payload: user ID
      SECRET_KEY,                                    // Secret key
      { expiresIn: "1h" }                            // Token expiration time
    ); 

    // Send success response with token
    res.json({ message: "Login successful", token });                              
  } catch (err) {
    // Handle server or DB errors
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
