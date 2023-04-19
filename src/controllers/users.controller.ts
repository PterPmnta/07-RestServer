import { Response, Request } from 'express';
import { UserModel } from '../models/user.model';

export const postUsers = async (req: Request, res: Response) => {
    const body = req.body;
    const user = new UserModel(body);

    await user.save();

    res.json({
        msg: 'POST API - From Controller',
        usuario: user
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
