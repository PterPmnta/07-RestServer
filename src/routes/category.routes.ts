import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/jwt-validator';
import { createCategory } from '../controllers/category.controller';
import { userValidation } from '../middlewares/user-validator';

export const categoryRoutes = Router();

categoryRoutes.post(
    '/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        userValidation
    ],
    createCategory
);

categoryRoutes.get('/');

categoryRoutes.get('/:id');

categoryRoutes.put('/:id');

categoryRoutes.delete('/:id');
