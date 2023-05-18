import { Response, Request } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFile = async (req: Request, res: Response) => {
    try {
        let uploadPath: any;

        if (
            !req.files ||
            Object.keys(req.files).length === 0 ||
            !req.files.archivo
        ) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const fileUploaded = req.files.archivo as fileUpload.UploadedFile;
        uploadPath = path.join(__dirname, '../uploads/', fileUploaded.name);

        // Use the mv() method to place the file somewhere on your server
        fileUploaded.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);

            res.status(200).json({
                message: `File uploaded successfully to ${uploadPath}`
            });
        });

        /* res.status(200).json({
            message: 'File uploaded successfully'
        }); */
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something went wrong - Upload file',
            error
        });
    }
};
