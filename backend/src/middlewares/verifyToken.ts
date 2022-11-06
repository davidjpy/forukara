import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ErrorCode, IToken } from '@utilities/types';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    console.log(authToken);

    if (!authToken || !authToken?.startsWith('Bearer ')) {
        return res.status(401).json({ message: { error: 'Authorizatin token missing', code: ErrorCode.AuthErr } });
    }

    const token = authToken.split(' ')[1];

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as IToken;
        // req.id = user.tokenId
        // req.email = user.tokenEmail
        // req.username = user.tokenUsername,
        next();
    } catch {
        return res.status(401).json({ message: { error: 'Unauthorized access', code: ErrorCode.AuthErr } });
    }
}

export default verifyToken;