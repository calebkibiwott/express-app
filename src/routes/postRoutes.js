import express from 'express';
import { createPost, getPosts, getPostById, postUpdate, deletedPost } from '../controllers/postControllers.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/createPost", authenticateToken, createPost);
router.get("/getPosts", authenticateToken, getPosts);
router.get("/getPostById/:id", authenticateToken, getPostById);
router.put("/postUpdate/:id", authenticateToken, postUpdate);
router.delete("/deletedPost/:id", authenticateToken, deletedPost);

export default router;