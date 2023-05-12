import { Response, Request } from 'express';
import { CategoryModel } from '../models/category.model';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const name = req.body.name.toUpperCase();

        const categoryNameValidate = await CategoryModel.findOne({ name });

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
        await category.save();

        res.status(201).json({
            msg: 'Category created successfully',
            category
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - POST Category'
        });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [categories, numberCategories] = await Promise.all([
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
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET categories'
        });
    }
};

export const getCategoriesById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id).populate(
            'user',
            'name'
        );

        res.json({
            category
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong - GET categories by ID'
        });
    }
};

export const updateCategories = () => {};

export const disableCategory = () => {};
