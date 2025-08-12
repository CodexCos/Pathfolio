import {
  createPortfolio,
  checkAuth,
  portfolioId,
  sendPortfolio,
  updatePortfolio
} from "../controllers/portfolioController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createPortfolio);
router.get("/", authMiddleware, portfolioId);
router.get("/user/:portfolioId", sendPortfolio);
router.get("/auth", authMiddleware, checkAuth);
router.patch("/update", authMiddleware, updatePortfolio);






export default router;
