import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOP,
} from "../controllers/order.js";
import { authCheck } from "../middleware/authcheck.js";
import { sellerCheck } from "../middleware/authSeller.js";

const router = express.Router();

router.post("/cod", authCheck ,placeOrderCOP);
router.get("/user", authCheck, getUserOrders);
router.get("/seller",sellerCheck, getAllOrders);

export default router;
