import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req: Request, res: Response, next: any) => {
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as any;
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
