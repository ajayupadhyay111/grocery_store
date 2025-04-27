import express from "express";
import { addAddress, deleteAddress, getAddress } from "../controllers/address.js";

const router = express.Router();

router.post("/add-address", addAddress)
router.get("/getAddress",getAddress);
router.delete("/deleteAddress/:id",deleteAddress
);

export default router;