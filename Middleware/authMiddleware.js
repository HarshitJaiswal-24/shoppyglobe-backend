import jwt from "jsonwebtoken";   // Library to work with JSON Web Tokens (JWT)

// Secret key used for signing/verifying tokens (should be kept safe, e.g., in .env file)
const SECRET_KEY = "your_jwt_secret";  

//// ---------------- AUTHENTICATION MIDDLEWARE ----------------
export const authenticate = (req, res, next) => {
  // Extract token from the "Authorization" header (format: Bearer <token>)
  const token = req.headers.authorization?.split(" ")[1];   

  // If no token is provided, block the request
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    // Verify the token using the secret key → decode payload
    const decoded = jwt.verify(token, SECRET_KEY);  
    
    // Attach decoded user info (payload) to request object so next middleware/route can use it
    req.user = decoded;

    // Continue to the next middleware/route handler
    next();           
  } catch {
    // If verification fails (invalid/expired token), deny access
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
