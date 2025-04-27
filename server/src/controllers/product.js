import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const productData = json.parse(req.body.productData);
    const images = req.files;

    const imagesUrl = await Promise.all(
        images.map(async(image)=>{
            let result = await cloudinary.uploader.upload(image.path,{
                resource_type: "image",
            });
            return result.secure_url;
        })
    )
    await Product.create({
        ...productData,
        image: imagesUrl,
    });
    res.status(200).json({
        success: true,
        message: "Product added successfully",
    });
} catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

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
  }

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
  }

  export const changeStock = async (req, res) => {
    try {
        const { id, stock } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        product.stock = stock;
        await product.save();
        res.status(200).json({
            success: true,
            message: "Product stock updated successfully",
        });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }