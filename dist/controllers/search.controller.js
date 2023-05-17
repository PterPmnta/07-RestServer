var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from '../models/user.model';
import { isValidObjectId } from 'mongoose';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
var Collections;
(function (Collections) {
    Collections["USERS"] = "users";
    Collections["CATEGORIES"] = "categories";
    Collections["PRODUCTS"] = "products";
})(Collections || (Collections = {}));
const Models = {
    users: UserModel,
    categories: CategoryModel,
    products: ProductModel
};
export const searchDynamic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collection, term } = req.params;
        const collections = Object.values(Collections);
        if (!collections.includes(collection)) {
            return res.status(400).json({
                msg: 'Collection not found. The allowed collections are : ' +
                    collections.join(', ')
            });
        }
        const data = yield searchProcess.dynamic(collection, term, res);
        return res.status(200).json({
            data
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Something went wrong - Search Process'
        });
    }
});
const searchProcess = {
    dynamic: (collection, term, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isMongoId = isValidObjectId(term);
            if (isMongoId) {
                const dataById = yield Models[collection].findById(term);
                return {
                    results: dataById ? [dataById] : []
                };
            }
            const regexTerm = new RegExp(term, 'i');
            let data = [];
            if (collection === 'users') {
                data = yield Models[collection].find({
                    $or: [{ name: regexTerm }, { email: regexTerm }],
                    $and: [{ status: true }]
                });
                return { results: data };
            }
            else {
                data = yield Models[collection].find({
                    name: regexTerm,
                    status: true
                });
                return { results: data };
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: `Something went wrong - Search Process - collection: ${collection}`
            });
        }
    })
};
//# sourceMappingURL=search.controller.js.map