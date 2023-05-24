import { Request, Response } from 'express';

export const fileValidator = (req: Request, res: Response, next: any) => {
    const files = JSON.parse(JSON.stringify(req.files));

    if (!files || Object.keys(files).length === 0 || !files.archivo) {
        return res.status(400).json({
            msg: 'No files to upload. Please check the file to upload.'
        });
    }
    next();
};
