import express from 'express';
import { google, signin, signup, signOut, signupDoctor } from '../controllers/auth.controller.mjs';

const router = express.Router();

router.post("/signup" , signup );
router.post("/signin", signin);
router.get('/signout', signOut);
router.post('/google', google)
router.post('/signupDoctor', signupDoctor)

export default router;