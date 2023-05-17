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
import { CategoryModel } from '../models/category.model';
export const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name.toUpperCase();
        const categoryNameValidate = yield CategoryModel.findOne({ name });
        if (categoryNameValidate) {
            return res.status(400).json({
                msg: `Category ${categoryNameValidate} already exists`
            });
        }
        const data = {
            name,
            user: req.user._id
        };
        const category = new CategoryModel(data);
        yield category.save();
        res.status(201).json({
            msg: 'Category created successfully',
            category
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - POST Category'
        });
    }
});
export const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };
        const [categories, numberCategories] = yield Promise.all([
            CategoryModel.find(query)
                .limit(Number(limite))
                .skip(Number(desde))
                .populate('user', 'name'),
            CategoryModel.countDocuments(query)
        ]);
        res.json({
            categories,
            numberCategories
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET categories'
        });
    }
});
export const getCategoriesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield CategoryModel.findById(id).populate('user', 'name');
        res.json({
            category
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET categories by ID'
        });
    }
});
export const updateCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { status, user } = _a, data = __rest(_a, ["status", "user"]);
        data.name = data.name.toUpperCase();
        data.user = req.user._id;
        const category = yield CategoryModel.findByIdAndUpdate(id, data, {
            new: true
        });
        res.json({
            msg: 'Category updated successfully',
            category
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - PUT categories'
        });
    }
});
export const disableCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = { status: false };
        const categoryDisabled = yield CategoryModel.findByIdAndUpdate(id, query, {
            new: true
        });
        res.json({
            categoryDisabled
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - DELETE categories'
        });
    }
});
//# sourceMappingURL=category.controller.js.map