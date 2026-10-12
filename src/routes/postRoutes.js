import express from 'express';
import { createPost } from '../controllers/postControllers.js';

const router = express.Router()

router.post("/createPost", createPost);

export default router;