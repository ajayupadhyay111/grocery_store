import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    await Address.create({ userId, ...address });
    res.status(200).json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const address = await Address.find({ userId });
    res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      address,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.body;
    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ message: "User ID and Address ID are required" });
    }
    await Address.findByIdAndDelete(addressId);
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
