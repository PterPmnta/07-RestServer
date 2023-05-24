import { Router } from 'express';
import { check } from 'express-validator';
import { uploadFile } from '../controllers/upload.controller';

export const uploadsRoutes = Router();

uploadsRoutes.post('/', uploadFile);
