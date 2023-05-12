import { Schema, model } from 'mongoose';

interface ICategory {
    name: string;
    status: boolean;
    user: Schema.Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    data.user.uid = data.user._id;
    delete data.user._id;
    return data;
};

export const CategoryModel = model<ICategory>('Category', CategorySchema);
