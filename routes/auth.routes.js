import express from 'express';
import { register } from '../controllers/auth.controllers.js';

const router = express();

router.post('/register',register)


export default router;