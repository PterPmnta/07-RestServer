import { Schema, model } from 'mongoose';

interface IRole {
    role: string;
}

const RoleSchema = new Schema<IRole>({
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
});

export const RoleModel = model<IRole>('Role', RoleSchema);
