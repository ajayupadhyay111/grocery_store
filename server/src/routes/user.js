import express from "express";
import { IsAuth, login, logout, register } from "../controllers/user.js";
import { authCheck } from "../middleware/authcheck.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/is-auth",authCheck, IsAuth);
router.get("/logout",authCheck, logout);

export default router;