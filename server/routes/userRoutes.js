import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

export default router;
