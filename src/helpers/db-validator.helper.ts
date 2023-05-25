import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
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

export const existedUserById = async (id: any) => {
    const existedUser = await UserModel.findById(id);
    if (!existedUser) throw new Error(`The user with id: ${id} doesn't exist`);
};

export const existedCategoryById = async (id: any) => {
    const existedCategory = await CategoryModel.findById(id);
    if (!existedCategory)
        throw new Error(`The category with id: ${id} doesn't exist`);
};

export const existedProductById = async (id: any) => {
    const existedProduct = await ProductModel.findById(id);
    if (!existedProduct)
        throw new Error(`The product with id: ${id} doesn't exist`);
};

export const collectionsAllowed = (
    collection: string = '',
    collections: string[] = []
) => {
    const isAllowed = collections.includes(collection);
    if (!isAllowed) {
        throw new Error(`The collection ${collection} is not allowed`);
    }

    return true;
};
