var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
export const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userByUID = yield UserModel.findById(uid);
        req.user = userByUID;
        if (!userByUID)
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la DB'
            });
        if (!(userByUID === null || userByUID === void 0 ? void 0 : userByUID.status)) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no permitido'
            });
        }
        req.uid = uid;
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
});
//# sourceMappingURL=jwt-validator.js.map