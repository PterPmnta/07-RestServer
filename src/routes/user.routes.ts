import { Router } from 'express';
import {
    deleteUsers,
    getUsers,
    patchUsers,
    postUsers,
    putUsers
} from '../controllers/users.controller';
import { check } from 'express-validator';

export const router = Router();

router.post('/', [check('email', 'Email is not valid').isEmail()], postUsers);

router.get('/', getUsers);

router.patch('/', patchUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);
