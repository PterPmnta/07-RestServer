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
import {
    existedEmail,
    existedUserById,
    roleValidator
} from '../helpers/db-validator.helper';

export const router = Router();

router.post(
    '/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('email', 'Email is not valid').custom(existedEmail),
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

router.patch('/:id', patchUsers);

router.put(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existedUserById),
        userValidation
    ],
    putUsers
);

router.delete('/', deleteUsers);
