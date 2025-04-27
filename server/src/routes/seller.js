import express from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/seller.js";
import { sellerCheck } from "../middleware/authSeller.js";

const router = express.Router();

router.post("/login", sellerLogin);
router.get("/is-auth",sellerCheck, isSellerAuth);
router.get("/logout", sellerLogout);

export default router;