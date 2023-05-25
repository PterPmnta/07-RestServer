import { Response, Request } from 'express';
import path from 'path';
import fs from 'fs';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { processUploadFile } from '../helpers/upload-file.helper';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
cloudinary.config(process.env.CLOUDINARY_URL!);

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const fileToUpload = req.files?.archivo as fileUpload.UploadedFile;

        const fileUploadedName = await processUploadFile(fileToUpload);
        res.json({ name: fileUploadedName });
    } catch (error) {
        console.log(error);

        res.status(400).json({
            message: 'Something went wrong - Upload file',
            error
        });
    }
};

export const updateImage = async (req: Request, res: Response) => {
    try {
        const { collection, id } = req.params;

        let modelo;

        switch (collection) {
            case 'users':
                modelo = await UserModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    });
                break;
            case 'products':
                modelo = await ProductModel.findById(id);
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

        const fileUploaded = req.files?.archivo as fileUpload.UploadedFile;

        const fileName: any = await processUploadFile(
            fileUploaded,
            undefined,
            collection
        );

        if (modelo.img) {
            const pathImage = path.join(
                __dirname,
                '../uploads/',
                collection,
                modelo.img
            );

            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }

        modelo.img = fileName;

        await modelo.save();

        res.json(modelo);
    } catch (error) {
        res.status(500).json({ msg: 'Error at the moment to upload the file' });
    }
};

export const updateCloudinaryImage = async (req: Request, res: Response) => {
    try {
        const { collection, id } = req.params;

        let modelo;

        switch (collection) {
            case 'users':
                modelo = await UserModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    });
                break;
            case 'products':
                modelo = await ProductModel.findById(id);
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

            await cloudinary.uploader.destroy(public_id);
        }

        const fileToUpload = req.files?.archivo as fileUpload.UploadedFile;

        const respFromCloudinary = await cloudinary.uploader.upload(
            fileToUpload.tempFilePath
        );

        modelo.img = respFromCloudinary.secure_url;

        await modelo.save();

        res.json(modelo);
    } catch (error) {
        res.status(500).json({ msg: 'Error at the moment to upload the file' });
    }
};

export const getImage = async (req: Request, res: Response) => {
    try {
        const { collection, id } = req.params;

        let modelo;

        switch (collection) {
            case 'users':
                modelo = await UserModel.findById(id);
                if (!modelo)
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    });
                break;
            case 'products':
                modelo = await ProductModel.findById(id);
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
            const pathImage = path.join(
                __dirname,
                '../uploads/',
                collection,
                modelo.img
            );

            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage);
            }
        }

        const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');

        res.sendFile(pathNoImage);
    } catch (error) {
        res.status(500).json({
            msg: 'Error at the moment to visualized the image'
        });
    }
};
