import jwt from "jsonwebtoken";

export const sellerCheck = (req, res, next) => {
  const token = req.cookies.sellerToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
