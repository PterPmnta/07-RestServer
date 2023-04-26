var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Schema, model } from 'mongoose';
var ROLEUSER;
(function (ROLEUSER) {
    ROLEUSER["ADMIN"] = "ADMIN_ROLE";
    ROLEUSER["USER"] = "USER_ROLE";
})(ROLEUSER || (ROLEUSER = {}));
const UserSchema = new Schema({
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
    const _a = this.toObject(), { __v, password } = _a, user = __rest(_a, ["__v", "password"]);
    return user;
};
export const UserModel = model('User', UserSchema);
//# sourceMappingURL=user.model.js.map