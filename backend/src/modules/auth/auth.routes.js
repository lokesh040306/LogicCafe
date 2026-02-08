import express from "express";
import { register, login } from "./auth.controller.js";

const router = express.Router();

/**
 * Auth Routes
 * Base path: /api/auth
 */
router.post("/register", register);
router.post("/login", login);

export default router;
