import express from 'express';
import { getMessage, SendMessage } from '../controllers/message.controllor.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';
const router = express.Router();

router.post("/send/:id", isAuthenticated, SendMessage)
router.get("/get/:id", isAuthenticated, getMessage)


export default router