import express from 'express';
import { getOtherusers, Login, logout, register } from '../controllers/user.controller.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';
const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.get("/logout", logout);
router.get("/otheruser", isAuthenticated, getOtherusers);

export default router