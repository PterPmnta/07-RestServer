import { Response, Request } from 'express';

export const postUsers = (req: Request, res: Response) => {
    const body = req.body;

    res.json({
        msg: 'POST API - From Controller',
        body: body
    });
};

export const getUsers = (req: Request, res: Response) => {
    const params = req.query;
    res.json({
        msg: 'GET API - From Controller',
        query: params
    });
};

export const putUsers = (req: Request, res: Response) => {
    const id = req.params.id;

    res.json({
        msg: 'PUT API - From Controller',
        id: id
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
