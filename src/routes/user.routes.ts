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
        check('role', 'This role is not valid').isIn([
            'ADMIN_ROLE',
            'USER_ROLE'
        ]),
        userValidation
    ],
    postUsers
);

router.get('/', getUsers);

router.patch('/', patchUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);
