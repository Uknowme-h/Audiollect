import express from 'express';
import { login, logout, addbook, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifytoken.js';



const router = express.Router();
router.get('/check-auth', verifyToken, checkAuth);


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

router.post('/library', verifyToken, addbook)






export default router;