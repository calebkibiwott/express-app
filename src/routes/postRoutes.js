import express from 'express';
import { createPost } from '../controllers/postControllers.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/createPost", authenticateToken, createPost);

export default router;