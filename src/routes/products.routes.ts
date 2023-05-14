import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/jwt-validator';
import { userValidation } from '../middlewares/user-validator';
import {
    existedCategoryById,
    existedProductById
} from '../helpers/db-validator.helper';
import { validatedAdminRole } from '../middlewares/role-validator';
import {
    createProduct,
    disableProduct,
    getProductById,
    getProducts,
    updateProduct
} from '../controllers/products.controller';

export const productRoutes = Router();

productRoutes.post(
    '/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('category', 'Id is not valid mongoId').isMongoId(),
        check('category').custom(existedCategoryById),
        userValidation
    ],
    createProduct
);

productRoutes.get('/', getProducts);

productRoutes.get(
    '/:id',
    [
        check('id', 'Id is not valid mongoId').isMongoId(),
        check('id').custom(existedProductById),
        userValidation
    ],
    getProductById
);

productRoutes.put(
    '/:id',
    [
        validateJWT,
        check('id', 'Id is not valid mongoId').isMongoId(),
        check('id').custom(existedProductById),
        userValidation
    ],
    updateProduct
);

productRoutes.delete(
    '/:id',
    [
        validateJWT,
        validatedAdminRole,
        check('id', 'Id is not valid mongoId').isMongoId(),
        check('id').custom(existedProductById),
        userValidation
    ],
    disableProduct
);
