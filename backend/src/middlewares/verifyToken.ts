import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ErrorCode, IToken } from '@utilities/types';

// Verify the bearer token of the requests for all protected routes
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    console.log(authToken)
    // Case 1: Bearer token missing
    if (!authToken || !authToken?.startsWith('Bearer ')) {
        return res.status(401).json({ message: { error: 'Authorizatin token missing', code: ErrorCode.AuthErr } });
    }

    const token = authToken.split(' ')[1];

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as IToken;
        next();
    } catch {
        // Case 2: Invalid token
        return res.status(401).json({ message: { error: 'Unauthorized access', code: ErrorCode.AuthErr } });
    }
}
