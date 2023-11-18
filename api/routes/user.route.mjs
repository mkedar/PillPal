import express from 'express';
import { test, updateUser } from '../controllers/user.controller.mjs';
import { verifyToken } from '../utils/verifyUser.mjs';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)

export default router;