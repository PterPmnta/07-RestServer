import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/jwt-validator';
import { createCategory, disableCategory, getCategories, getCategoriesById, updateCategories } from '../controllers/category.controller';
import { userValidation } from '../middlewares/user-validator';
import { existedCategoryById } from '../helpers/db-validator.helper';
import { validatedAdminRole } from '../middlewares/role-validator';
export const categoryRoutes = Router();
categoryRoutes.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    userValidation
], createCategory);
categoryRoutes.get('/', getCategories);
categoryRoutes.get('/:id', [
    check('id', 'Id is not valid mongoId').isMongoId(),
    check('id').custom(existedCategoryById),
    userValidation
], getCategoriesById);
categoryRoutes.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existedCategoryById),
    userValidation
], updateCategories);
categoryRoutes.delete('/:id', [
    validateJWT,
    validatedAdminRole,
    check('id', 'Id is not valid mongoId').isMongoId(),
    check('id').custom(existedCategoryById),
    userValidation
], disableCategory);
//# sourceMappingURL=category.routes.js.map