import express from "express";
import { addAddress, deleteAddress, getAddress } from "../controllers/address.js";
import { authCheck } from "../middleware/authcheck.js";

const router = express.Router();

router.post("/add-address",authCheck, addAddress)
router.get("/getAddress",authCheck,getAddress);
router.delete("/deleteAddress/:id",authCheck,deleteAddress
);

export default router;