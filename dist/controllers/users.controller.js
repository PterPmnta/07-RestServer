var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
export const postUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const user = new UserModel({ name, email, password, role });
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    yield user.save();
    res.json({
        msg: 'POST API - From Controller',
        usuario: user
    });
});
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    const [users, numberUsers] = yield Promise.all([
        UserModel.find(query).limit(Number(limite)).skip(Number(desde)),
        UserModel.countDocuments(query)
    ]);
    res.json({
        users,
        numberUsers
    });
});
export const putUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { _id, password, google, email } = _a, user = __rest(_a, ["_id", "password", "google", "email"]);
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
    }
    const existedUser = yield UserModel.findByIdAndUpdate(id, user);
    res.json({
        msg: 'PUT API - From Controller',
        existedUser
    });
});
export const patchUsers = (req, res) => {
    res.json({
        msg: 'PATCH API - From Controller'
    });
};
export const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield UserModel.findByIdAndUpdate(id, {
        status: false
    });
    res.json({
        deletedUser
    });
});
//# sourceMappingURL=users.controller.js.map