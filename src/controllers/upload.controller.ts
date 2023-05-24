import { Response, Request } from 'express';
import { processUploadFile } from '../helpers/upload-file.helper';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (
            !req.files ||
            Object.keys(req.files).length === 0 ||
            !req.files.archivo
        ) {
            return res.status(400).send('No files were uploaded.');
        }

        const fileName = await processUploadFile(req.files.archivo);
        res.json({ name: fileName });
    } catch (error) {
        console.log(error);

        res.status(400).json({
            message: 'Something went wrong - Upload file',
            error
        });
    }
};
