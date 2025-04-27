import User from "../models/user.js";

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }
    await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
