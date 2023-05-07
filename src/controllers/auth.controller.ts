import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { generateJWT } from '../helpers/generate-jwt.helper';
import { googleVerify } from '../helpers/google-verify.helper';

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
                msg: `El usuario no esta activo - estado ${existedUser.status}`
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

export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body;

    try {
        const { name, email, img } = await googleVerify(id_token);

        res.json({
            msg: 'googleSignIn',
            id_token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido',
            ok: false
        });
    }
};
