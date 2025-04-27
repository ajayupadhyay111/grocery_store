import express from "express";
import { updateCart } from "../controllers/cart.js";
import { authCheck } from "../middleware/authcheck.js";

const router = express.Router();

router.put("/update-cart",authCheck, updateCart)

export default router;