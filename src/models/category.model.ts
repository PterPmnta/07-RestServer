import { Schema, model } from 'mongoose';

interface ICategory {
    name: string;
    status: boolean;
    user: Schema.Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        schema: 'User',
        required: true
    }
});

export const CategoryModel = model<ICategory>('Category', CategorySchema);
