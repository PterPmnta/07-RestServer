import { Response, Request } from 'express';
import { ProductModel } from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { status, user, ...body } = req.body;

        const name = body.name.toUpperCase();

        const productNameValidate = await ProductModel.findOne({ name });

        if (productNameValidate) {
            return res.status(400).json({
                msg: `Product ${productNameValidate} already exists`
            });
        }

        const data = {
            ...body,
            name,
            user: req.user._id
        };

        const product = new ProductModel(data);
        await product.save();

        res.status(201).json({
            msg: 'Product created successfully',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong - POST Product'
        });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [products, numberProducts] = await Promise.all([
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
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET products'
        });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id)
            .populate('user', 'name')
            .populate('category', 'name');

        res.json({
            product
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET product by ID'
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, user, ...data } = req.body;

        data.name = data.name.toUpperCase();
        data.user = req.user._id;

        const product = await ProductModel.findByIdAndUpdate(id, data, {
            new: true
        });

        res.json({
            msg: 'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - PUT product'
        });
    }
};

export const disableProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = { status: false };

        const productDisabled = await ProductModel.findByIdAndUpdate(
            id,
            query,
            {
                new: true
            }
        );

        res.json({
            productDisabled
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - DELETE product'
        });
    }
};
