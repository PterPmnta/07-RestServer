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
import { ProductModel } from '../models/product.model';
export const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { status, user } = _a, body = __rest(_a, ["status", "user"]);
        const name = body.name.toUpperCase();
        const productNameValidate = yield ProductModel.findOne({ name });
        if (productNameValidate) {
            return res.status(400).json({
                msg: `Product ${productNameValidate} already exists`
            });
        }
        const data = Object.assign(Object.assign({}, body), { name, user: req.user._id });
        const product = new ProductModel(data);
        yield product.save();
        res.status(201).json({
            msg: 'Product created successfully',
            product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong - POST Product'
        });
    }
});
export const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };
        const [products, numberProducts] = yield Promise.all([
            ProductModel.find(query)
                .limit(Number(limite))
                .skip(Number(desde))
                .populate('user', 'name')
                .populate('category', 'name'),
            ProductModel.countDocuments(query)
        ]);
        res.json({
            products,
            numberProducts
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET products'
        });
    }
});
export const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield ProductModel.findById(id)
            .populate('user', 'name')
            .populate('category', 'name');
        res.json({
            product
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET product by ID'
        });
    }
});
export const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _b = req.body, { status, user } = _b, data = __rest(_b, ["status", "user"]);
        data.name = data.name.toUpperCase();
        data.user = req.user._id;
        const product = yield ProductModel.findByIdAndUpdate(id, data, {
            new: true
        });
        res.json({
            msg: 'Product updated successfully',
            product
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - PUT product'
        });
    }
});
export const disableProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = { status: false };
        const productDisabled = yield ProductModel.findByIdAndUpdate(id, query, {
            new: true
        });
        res.json({
            productDisabled
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - DELETE product'
        });
    }
});
//# sourceMappingURL=products.controller.js.map