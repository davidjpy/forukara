import { CorsOptions } from 'cors';

import { allowedOrigins } from './allowedOrigins';

export const corsOptions: CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
}
