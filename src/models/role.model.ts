import { Schema, model } from 'mongoose';

interface IRole {
    role_name: string;
}

const RoleSchema = new Schema<IRole>({
    role_name: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
});

export const RoleModel = model<IRole>('Role', RoleSchema);
