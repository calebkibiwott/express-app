import express from 'express'
import { register }  from '../controllers/authControllers.js';
import { login }  from '../controllers/authControllers.js';
import { updatePassword, logout, getMe } from '../controllers/authControllers.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update-password", updatePassword);
router.get("/me", authenticateToken, getMe);

export default router;
