import { NextFunction, Request, Response } from 'express';

import { logEvents } from '@middleware/logger';

interface Error {
    name?: string;
    stack?: string;
    message?: string;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.get('origin')}`, 'errLog.log');
    console.log(err.stack);
    const status = res.statusCode || 500;
    res.status(status);
    res.json({ message: err.message });
}

export { errorHandler }
