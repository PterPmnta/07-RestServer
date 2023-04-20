import { Schema, model } from 'mongoose';

enum ROLEUSER {
    ADMIN = 'ADMIN_ROLE',
    USER = 'USER_ROLE'
}

interface IUser {
    name: string;
    email: string;
    password: string;
    img: string;
    role: ROLEUSER;
    status: boolean;
    google: boolean;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ROLEUSER
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
};

export const UserModel = model<IUser>('User', UserSchema);
