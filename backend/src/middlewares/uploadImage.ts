import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

// Upload image to local disk middleware
const storage = multer.diskStorage({
    // determine local storage location
    destination: (req: Request, file, callback) => {
        console.log(file)
        callback(null, '../media/images');
    },
    // Set image filename
    filename: (req: Request, file, callback) => {
        console.log(file)
        console.log(file.originalname)
        console.log(path.extname(file.originalname))
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });

