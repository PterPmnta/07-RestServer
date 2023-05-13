import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/jwt-validator';
import { userValidation } from '../middlewares/user-validator';
import { existedCategoryById } from '../helpers/db-validator.helper';
import { validatedAdminRole } from '../middlewares/role-validator';

export const productRoutes = Router();
