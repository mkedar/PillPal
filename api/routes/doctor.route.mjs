import express from 'express';
import { test } from '../controllers/doctor.controller.mjs';
import { verifyToken } from '../utils/verifyUser.mjs';

const router = express.Router();

router.get('/test', test);

export default router;