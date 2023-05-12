import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export const validateJWT = async (req: Request, res: Response, next: any) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as any;

        const userByUID = await UserModel.findById(uid);
        req.user = userByUID;

        if (!userByUID)
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la DB'
            });

        if (!userByUID?.status) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no permitido'
            });
        }

        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
