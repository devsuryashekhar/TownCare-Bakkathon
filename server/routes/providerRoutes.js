import express from "express";
import { signup, login, createService } from "../controllers/providerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/service/upload", protect, createService);

export default router;
