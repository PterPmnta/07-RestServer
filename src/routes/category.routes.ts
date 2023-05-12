import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/jwt-validator';
import {
    createCategory,
    getCategories,
    getCategoriesById
} from '../controllers/category.controller';
import { userValidation } from '../middlewares/user-validator';
import { existedCategoryById } from '../helpers/db-validator.helper';

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

categoryRoutes.get('/', getCategories);

categoryRoutes.get(
    '/:id',
    [
        check('id', 'Id is not valid mongoId').isMongoId(),
        check('id').custom(existedCategoryById),
        userValidation
    ],
    getCategoriesById
);

categoryRoutes.put('/:id');

categoryRoutes.delete('/:id');
