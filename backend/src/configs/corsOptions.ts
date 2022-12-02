import { CorsOptions } from 'cors';

import { allowedOrigins } from './allowedOrigins';

// CORS configuration 
export const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback): void => {
        // !origin for development server
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
