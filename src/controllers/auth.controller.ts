import { Response, Request } from 'express';

export const login = (req: Request, res: Response) => {
    res.json({
        msg: 'Login OK'
    });
};
