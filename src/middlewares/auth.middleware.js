const jwt = require("jsonwebtoken");

// Verifies JWT token and allows access to protected routes
const auth = async (req, res, next) => {
  try {
    // extract token from Authorization header 
    const token = req.headers.authorization?.split(" ")[1];

    // if token is not present, deny access
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach decoded user data to request object
    req.user = decoded;

    // move to next middleware or controller
    next();
  } catch (error) {
    // if token is invalid or expired
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = auth;