export const fileValidator = (req: any, res: any, next: any) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: 'No files to upload. Please check the file to upload.'
        });
    }
    next();
};
