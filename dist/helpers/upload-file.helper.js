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
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const extentionsAllowed = ['png', 'jpg', 'jpeg', 'gif'];
export const processUploadFile = (files, extentions, folder) => __awaiter(void 0, void 0, void 0, function* () {
    let uploadPath;
    let joined;
    if (typeof extentions === 'undefined' || extentions.length < 1) {
        extentions = extentionsAllowed;
    }
    return new Promise((resolve, reject) => {
        const fileUploaded = files;
        const splitName = fileUploaded.name.split('.');
        const fileExtension = splitName[splitName.length - 1];
        if (!extentions.includes(fileExtension)) {
            reject(`The ${fileExtension} is not a valid file extension. Only allowed ${extentions}`);
            return;
        }
        const tempName = uuidv4() + '.' + fileExtension;
        joined = path.join(__dirname, '../uploads/', tempName);
        if (typeof folder !== 'undefined' || folder.length > 0) {
            joined = path.join(__dirname, '../uploads/', folder, tempName);
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
});
//# sourceMappingURL=upload-file.helper.js.map