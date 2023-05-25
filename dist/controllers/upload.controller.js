var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { processUploadFile } from '../helpers/upload-file.helper';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import * as dotenv from 'dotenv';
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
cloudinary.config(process.env.CLOUDINARY_URL);
export const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const fileToUpload = (_a = req.files) === null || _a === void 0 ? void 0 : _a.archivo;
        const fileUploadedName = yield processUploadFile(fileToUpload);
        res.json({ name: fileUploadedName });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Something went wrong - Upload file',
            error
        });
    }
});
export const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { collection, id } = req.params;
        let modelo;
        switch (collection) {
            case 'users':
                modelo = yield UserModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    });
                break;
            case 'products':
                modelo = yield ProductModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el producto'
                    });
                break;
            default:
                return res.status(500).json({
                    message: 'No valid collection'
                });
        }
        const fileUploaded = (_b = req.files) === null || _b === void 0 ? void 0 : _b.archivo;
        const fileName = yield processUploadFile(fileUploaded, undefined, collection);
        if (modelo.img) {
            const pathImage = path.join(__dirname, '../uploads/', collection, modelo.img);
            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }
        modelo.img = fileName;
        yield modelo.save();
        res.json(modelo);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error at the moment to upload the file' });
    }
});
export const updateCloudinaryImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { collection, id } = req.params;
        let modelo;
        switch (collection) {
            case 'users':
                modelo = yield UserModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    });
                break;
            case 'products':
                modelo = yield ProductModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el producto'
                    });
                break;
            default:
                return res.status(500).json({
                    message: 'No valid collection'
                });
        }
        if (modelo.img) {
            const nameArr = modelo.img.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split('.');
            yield cloudinary.uploader.destroy(public_id);
        }
        const fileToUpload = (_c = req.files) === null || _c === void 0 ? void 0 : _c.archivo;
        const respFromCloudinary = yield cloudinary.uploader.upload(fileToUpload.tempFilePath);
        modelo.img = respFromCloudinary.secure_url;
        yield modelo.save();
        res.json(modelo);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error at the moment to upload the file' });
    }
});
export const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collection, id } = req.params;
        let modelo;
        switch (collection) {
            case 'users':
                modelo = yield UserModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    });
                break;
            case 'products':
                modelo = yield ProductModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el producto'
                    });
                break;
            default:
                return res.status(500).json({
                    message: 'No valid collection'
                });
        }
        if (modelo.img) {
            const pathImage = path.join(__dirname, '../uploads/', collection, modelo.img);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage);
            }
        }
        const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');
        res.sendFile(pathNoImage);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error at the moment to visualized the image'
        });
    }
});
//# sourceMappingURL=upload.controller.js.map