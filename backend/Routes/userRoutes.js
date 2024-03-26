import express from 'express';
import { register,authUser,logoutUser } from '../Controllers/userController.js';
const router = express.Router();

router.post('/register',register)
router.post('/login',authUser)
router.post('/logout',logoutUser)

export default router;