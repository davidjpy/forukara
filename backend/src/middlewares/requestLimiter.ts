import rateLimit from 'express-rate-limit';
import { NextFunction, Request, Response } from 'express';

import { logEvents } from '@middlewares/logger';
import { ErrorCode } from '@utilities/types';


export const emailLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: { message: { error: 'Too many request! Please try again after five minutes', code: ErrorCode.Failed } },
    handler: (req: Request, res: Response, next: NextFunction, options) => {
        logEvents(`emailLimiter: ${options.message.message}\t${req.method}\t${req.url}\t${req.get('origin')}`, 'errLog.log')
        res.status(options.statusCode).json(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false
});