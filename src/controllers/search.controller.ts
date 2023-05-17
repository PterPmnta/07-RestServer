import { Response, Request } from 'express';
import { IUser, UserModel } from '../models/user.model';
import { Model, isValidObjectId } from 'mongoose';
import { CategoryModel, ICategory } from '../models/category.model';
import { IProduct, ProductModel } from '../models/product.model';

enum Collections {
    USERS = 'users',
    CATEGORIES = 'categories',
    PRODUCTS = 'products'
}

interface ISearchProcess {
    [key: string]: Function;
}

interface IModels {
    [key: string]: Model<any>;
}

const Models: IModels = {
    users: UserModel,
    categories: CategoryModel,
    products: ProductModel
};

export const searchDynamic = async (req: Request, res: Response) => {
    try {
        const { collection, term } = req.params;

        const collections: Array<string> = Object.values(Collections);

        if (!collections.includes(collection)) {
            return res.status(400).json({
                msg:
                    'Collection not found. The allowed collections are : ' +
                    collections.join(', ')
            });
        }

        const data = await searchProcess.dynamic(collection, term, res);

        return res.status(200).json({
            data
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Something went wrong - Search Process'
        });
    }
};

const searchProcess: ISearchProcess = {
    dynamic: async (collection: string, term: string, res: Response) => {
        try {
            const isMongoId = isValidObjectId(term);

            if (isMongoId) {
                const dataById = await Models[collection].findById(term);
                return {
                    results: dataById ? [dataById] : []
                };
            }

            const regexTerm = new RegExp(term, 'i');

            let data: Array<IUser | IProduct | ICategory> = [];

            if (collection === 'users') {
                data = await Models[collection].find({
                    $or: [{ name: regexTerm }, { email: regexTerm }],
                    $and: [{ status: true }]
                });
                return { results: data };
            } else {
                data = await Models[collection].find({
                    name: regexTerm,
                    status: true
                });
                return { results: data };
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: `Something went wrong - Search Process - collection: ${collection}`
            });
        }
    }
};
