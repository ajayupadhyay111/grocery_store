import { cloudinary } from "../config/cloudinary.js";
import Product from "../models/product.js";
import fs from "fs"; // FileSystem for deleting temp files

export const addProduct = async (req, res) => {
    try {
      const productData = JSON.parse(req.body.productData);
      const images = req.files;
  
      // If no images are uploaded
      if (!images || images.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No images uploaded",
        });
      }
  
      // Upload images to Cloudinary
      const imagesUrl = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
            folder: "groceryWebApp", // Folder name in Cloudinary
          });
          return result.secure_url;
        })
      );

      // Delete temp files after uploading to Cloudinary
      images.forEach((image) => {
        fs.unlink(image.path, (err) => {
          if (err) console.error("Error deleting temp file: ", err);
        });
      });
  
      // Save product to DB
      await Product.create({
        ...productData,
        image: imagesUrl,
      });
  
      // Ensure only one response is sent
      return res.status(200).json({
        success: true,
        message: "Product added successfully",
      });
  
    } catch (error) {
      console.error("Error: ", error.message);
      
      // If error occurs, return the error response
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Product list fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product.inStock = inStock;
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product stock updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
