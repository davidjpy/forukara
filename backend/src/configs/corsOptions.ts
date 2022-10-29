import { CorsOptions } from 'cors';

import { allowedOrigins } from './allowedOrigins';

export const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback): void => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
