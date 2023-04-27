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
import {
    existedEmail,
    existedUserById,
    roleValidator
} from '../helpers/db-validator.helper';

export const userRoutes = Router();

userRoutes.post(
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

userRoutes.get('/', getUsers);

userRoutes.patch('/:id', patchUsers);

userRoutes.put(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existedUserById),
        userValidation
    ],
    putUsers
);

userRoutes.delete(
    '/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existedUserById),
        userValidation
    ],
    deleteUsers
);
