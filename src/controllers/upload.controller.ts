import { Response, Request } from 'express';
import { processUploadFile } from '../helpers/upload-file.helper';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import fileUpload from 'express-fileupload';

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

    modelo.img = fileName;

    await modelo.save();

    res.json(modelo);
};
