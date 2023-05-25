import { Router } from 'express';
import { check } from 'express-validator';
import {
    getImage,
    updateCloudinaryImage,
    updateImage,
    uploadFile
} from '../controllers/upload.controller';
import { userValidation } from '../middlewares/user-validator';
import { fileValidator } from '../middlewares/file-validator';
import { collectionsAllowed } from '../helpers/db-validator.helper';

const exitingCollections = ['users', 'products'];

export const uploadsRoutes = Router();

uploadsRoutes.post('/', fileValidator, uploadFile);

uploadsRoutes.put(
    '/:collection/:id',
    [
        fileValidator,
        check('id', 'No es un id válido de mongo').isMongoId(),
        check('collection').custom((c) =>
            collectionsAllowed(c, exitingCollections)
        ),
        userValidation
    ],
    updateCloudinaryImage
);

uploadsRoutes.get(
    '/:collection/:id',
    [
        check('id', 'No es un id válido de mongo').isMongoId(),
        check('collection').custom((c) =>
            collectionsAllowed(c, exitingCollections)
        ),
        userValidation
    ],
    getImage
);
