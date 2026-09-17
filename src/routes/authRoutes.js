import express from 'express'
import { register }  from '../controllers/authControllers';
import { login }  from '../controllers/authControllers';
import { updatePassword, logout, getMe } from '../controllers/authControllers';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update-password", updatePassword);
router.get("/me", getMe);
