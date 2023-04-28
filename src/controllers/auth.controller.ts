import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { generateJWT } from '../helpers/generate-jwt.helper';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existedUser = await UserModel.findOne({ email });
        if (!existedUser) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }

        if (!existedUser.status) {
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }

        const isValidPassword = bcrypt.compareSync(
            password,
            existedUser.password
        );

        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Credenciales de acceso incorrectas'
            });
        }

        const token = await generateJWT(existedUser.id);

        res.json({
            existedUser,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al intentar loguearse'
        });
    }
};
