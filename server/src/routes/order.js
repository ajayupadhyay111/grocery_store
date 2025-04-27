import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOP,
} from "../controllers/order.js";

const router = express.Router();

router.post("/cod", placeOrderCOP);
router.get("/user", getUserOrders);
router.get("/seller", getAllOrders);

export default router;
