import { Schema, model } from 'mongoose';
const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
});
export const RoleModel = model('Role', RoleSchema);
//# sourceMappingURL=role.model.js.map