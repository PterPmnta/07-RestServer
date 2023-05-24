import { Schema, model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    status: boolean;
    price: number;
    description: string;
    available: boolean;
    img: string;
    user: Schema.Types.ObjectId;
    category: Schema.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
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
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    img: {
        type: String
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    data.user.uid = data.user._id;
    delete data.user._id;
    return data;
};

export const ProductModel = model<IProduct>('Product', ProductSchema);
