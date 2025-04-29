import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
} from "../controllers/order.js";
import { authCheck } from "../middleware/authcheck.js";
import { sellerCheck } from "../middleware/authSeller.js";

const router = express.Router();

router.post("/cod", authCheck ,placeOrderCOD);
router.get("/user", authCheck, getUserOrders);
router.get("/seller",sellerCheck, getAllOrders);
router.post("/stripe", authCheck ,placeOrderStripe);

export default router;
