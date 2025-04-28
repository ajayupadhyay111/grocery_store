import express from "express";
import { addProduct, changeStock, productById, productList } from "../controllers/product.js";
import { sellerCheck } from "../middleware/authSeller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/add-product",upload.array("images"),sellerCheck, addProduct);
router.get("/product-list", productList );
router.get("/product/:id", productById);
router.post("/change-stock", sellerCheck,changeStock);

export default router;