import { RoleModel } from '../models/role.model';

export const roleValidator = async (role = '') => {
    const existedRole = await RoleModel.findOne({ role });
    if (!existedRole) throw new Error(`This role ${role} is not valid`);
};
