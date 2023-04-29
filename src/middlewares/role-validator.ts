import { Request, Response } from 'express';

export const validatedRole = (req: Request, res: Response, next: any) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'Must be validated the JWT first'
        });
    }

    if (req.user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();
};
