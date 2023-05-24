import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const extentionsAllowed = ['png', 'jpg', 'jpeg', 'gif'];

export const processUploadFile = async (
    files: any,
    extentions?: Array<string>,
    folder?: string
) => {
    let uploadPath: any;
    let joined;

    if (typeof extentions === 'undefined' || extentions.length < 1) {
        extentions = extentionsAllowed;
    }

    return new Promise((resolve, reject) => {
        const fileUploaded = files as fileUpload.UploadedFile;
        const splitName = fileUploaded.name.split('.');
        const fileExtension = splitName[splitName.length - 1];

        if (!extentions!.includes(fileExtension)) {
            reject(
                `The ${fileExtension} is not a valid file extension. Only allowed ${extentions}`
            );
            return;
        }

        const tempName = uuidv4() + '.' + fileExtension;

        joined = path.join(__dirname, '../uploads/', tempName);

        if (typeof folder !== 'undefined' || folder!.length > 0) {
            joined = path.join(__dirname, '../uploads/', folder!, tempName);
        }

        uploadPath = joined;

        fileUploaded.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve(tempName);
        });
    });
};
