import { Response, Request } from 'express';

export const postUsers = (req: Request, res: Response) => {
    const body = req.body;

    res.json({
        msg: 'POST API - From Controller',
        body: body
    });
};

export const getUsers = (req: Request, res: Response) => {
    res.json({
        msg: 'GET API - From Controller'
    });
};

export const putUsers = (req: Request, res: Response) => {
    res.json({
        msg: 'PUT API - From Controller'
    });
};

export const patchUsers = (req: Request, res: Response) => {
    res.json({
        msg: 'PATCH API - From Controller'
    });
};

export const deleteUsers = (req: Request, res: Response) => {
    res.json({
        msg: 'DELETE API - From Controller'
    });
};
