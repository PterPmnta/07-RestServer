import { Response, Request } from 'express';
import { CategoryModel } from '../models/category.model';

export const createCategory = (req: Request, res: Response) => {
    try {
        const name = req.body.name.toUpperCase();

        const categoryNameValidate: any = CategoryModel.findOne({ name });

        if (categoryNameValidate) {
            return res.status(400).json({
                msg: `Category ${categoryNameValidate.name} already exists`
            });
        }

        const data = {
            name,
            usuario: req.user._id
        };

        const category = new CategoryModel(data);
        category.save();

        res.status(201).json({
            msg: 'Category created successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};
