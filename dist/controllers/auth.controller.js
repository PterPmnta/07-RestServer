var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { generateJWT } from '../helpers/generate-jwt.helper';
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existedUser = yield UserModel.findOne({ email });
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
        const isValidPassword = bcrypt.compareSync(password, existedUser.password);
        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Credenciales de acceso incorrectas'
            });
        }
        const token = yield generateJWT(existedUser.id);
        res.json({
            existedUser,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Error al intentar loguearse'
        });
    }
});
//# sourceMappingURL=auth.controller.js.map