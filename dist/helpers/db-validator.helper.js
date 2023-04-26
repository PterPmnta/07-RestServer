var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RoleModel } from '../models/role.model';
import { UserModel } from '../models/user.model';
export const roleValidator = (role = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existedRole = yield RoleModel.findOne({ role });
    if (!existedRole)
        throw new Error(`This role ${role} is not valid`);
});
export const existedEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const emailExtisted = yield UserModel.findOne({ email });
    if (emailExtisted)
        throw new Error(`The email ${email} is already used`);
});
export const existedUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield UserModel.findById(id);
    if (!existedUser)
        throw new Error(`The user with id: ${id} doesn't exist`);
});
//# sourceMappingURL=db-validator.helper.js.map