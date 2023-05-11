import { Router } from 'express';
import { check } from 'express-validator';
import { userValidation } from '../middlewares/user-validator';

export const categoryRoutes = Router();

categoryRoutes.post('/');

categoryRoutes.get('/');

categoryRoutes.get('/:id');

categoryRoutes.put('/:id');

categoryRoutes.delete('/:id');
