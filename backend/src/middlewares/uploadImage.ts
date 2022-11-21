import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

const absolutePath = path.resolve('src/media/images');
// Upload image to local disk middleware
const storage = multer.diskStorage({
    // determine local storage location
    destination: (req: Request, file, callback) => {
        callback(null, absolutePath);
    },
    // Set image filename
    filename: (req: Request, file, callback) => {
        callback(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });

