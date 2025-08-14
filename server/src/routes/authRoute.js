import {
  googleLogin,
  signup,
  login,
  refresh,
  logout,
} from "../controllers/authController.js";
import { Router } from "express";

const router = Router();

router.post('/google', googleLogin);
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
