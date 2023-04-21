import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { RoleModel } from '../models/role.model';
import { UserModel } from '../models/user.model';

export const roleValidator = async (role = '') => {
    const existedRole = await RoleModel.findOne({ role });
    if (!existedRole) throw new Error(`This role ${role} is not valid`);
};

export const existedEmail = async (email = '') => {
    const emailExtisted = await UserModel.findOne({ email });
    if (emailExtisted) throw new Error(`The email ${email} is already used`);
};
