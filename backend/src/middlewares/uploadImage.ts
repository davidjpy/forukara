import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

// Upload image to local disk middleware
const storage = multer.diskStorage({
    // determine local storage location
    destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void): void => {
        callback(null, 'src/public/images');
    },
    // Set image filename
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void): void => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    if (!file) {
        return callback(null, false);
    }
    callback(null, true);
}

export const upload = multer({ storage: storage, fileFilter: fileFilter });

