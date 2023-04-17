import { Router } from 'express';
import { deleteUsers, getUsers, patchUsers, postUsers, putUsers } from '../controllers/users.controller';
export const router = Router();
router.post('/', postUsers);
router.get('/', getUsers);
router.patch('/', patchUsers);
router.put('/:id', putUsers);
router.delete('/', deleteUsers);
//# sourceMappingURL=user.routes.js.map