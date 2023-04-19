import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { validationResult } from 'express-validator';

export const postUsers = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { name, email, password, role } = req.body;
    const user = new UserModel({ name, email, password, role });

    const emailExtisted = await UserModel.findOne({ email });
    if (emailExtisted)
        return res.status(400).json({ msg: 'Email already exists' });

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

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
