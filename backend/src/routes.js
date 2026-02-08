import express from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import patternRoutes from "./modules/patterns/pattern.routes.js";
import problemRoutes from "./modules/problems/problem.routes.js";
import progressRoutes from "./modules/progress/progress.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";

import { protect } from "./middlewares/auth.middleware.js";

const router = express.Router();

/* Public routes */
router.use("/auth", authRoutes);
router.use("/patterns", patternRoutes);
router.use("/problems", problemRoutes);

/*  Protected routes (require login) */
router.use("/progress", protect, progressRoutes);

router.use("/profile", profileRoutes);

export default router;
