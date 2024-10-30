import jwt from "jsonwebtoken";

// Secret key to sign and verify JWT tokens (stored securely in .env)
<<<<<<< HEAD
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourSecretKey";

// Middleware for User Authentication
export const userAuthMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach decoded token (user info) to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

=======
const JWT_SECRET = "jwt_secret_key";

// Middleware for User Authentication
export const userAuthMiddleware =  (req, res, next) => {
    
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: "No token provided, access denied." });
  }

  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: "Session expired, please log in again." });
      }
      
      
      req.user = decoded;
      next(); 
  });
};
>>>>>>> origin/main
// Middleware for Admin Authentication (User + Admin role check)
export const adminAuthMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach decoded token (user info) to the request object

    // Check if user has admin privileges
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); // Move to the next middleware or route handler if authorized
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Function to generate a token (for login routes, etc.)
export const generateToken = (user) => {
  // Create a JWT token for the user
  return jwt.sign(
    {
      _id: user._id,
      role: user.role, // Include user role in the token (e.g., "admin", "user")
      email: user.email,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }, // Set token expiry (e.g., 7 days)
  );
};
