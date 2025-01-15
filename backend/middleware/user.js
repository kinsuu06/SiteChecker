
import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    // Verify the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded Token:", tokenDecode);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id; // Attach user ID to request body
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ success: false, message: 'Invalid Token. Please Login Again.' });
  }
};

export default userAuth;
