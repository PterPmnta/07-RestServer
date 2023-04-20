import { Router } from 'express';
import {
    deleteUsers,
    getUsers,
    patchUsers,
    postUsers,
    putUsers
} from '../controllers/users.controller';
import { check } from 'express-validator';
import { userValidation } from '../middlewares/user-validator';
import { RoleModel } from '../models/role.model';
import { roleValidator } from '../helpers/db-validator.helper';

export const router = Router();

router.post(
    '/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('name', 'Name cant be empty').not().isEmpty(),
        check('password', 'Password must be at least 6 characters')
            .isLength({ min: 6 })
            .not()
            .isEmpty(),
        check('role').custom(roleValidator),
        userValidation
    ],
    postUsers
);

router.get('/', getUsers);

router.patch('/', patchUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);
