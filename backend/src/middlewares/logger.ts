import { NextFunction, Request, Response } from 'express';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import path from 'path';


const logEvents = async (message: string, logFileName: string) => {
    const dateTime: string = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem: string = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.url}\t${req.get('origin')}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}

export { logEvents, logger }