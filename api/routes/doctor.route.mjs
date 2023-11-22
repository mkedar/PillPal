import express from 'express';
import { test, deleteDoctor } from '../controllers/doctor.controller.mjs';
import { verifyToken } from '../utils/verifyUser.mjs';

const router = express.Router();

router.get('/test', test);
router.delete('/delete/:id', verifyToken, deleteDoctor)

export default router;