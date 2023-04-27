import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controller';
import { userValidation } from '../middlewares/user-validator';

export const authRoutes = Router();

authRoutes.post(
    '/login',
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    userValidation,
    login
);
