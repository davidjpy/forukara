require('dotenv').config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { connectDB } from '@config/dbConnect';
import { corsOptions } from '@config/corsOptions';
import { logEvents, logger } from '@middleware/logger';
import { errorHandler } from '@middleware/errorHandler';
import commentRoutes from '@route/commentRoutes';
import postRoutes from '@route/postRoutes';
import userRoutes from '@route/userRoutes'

interface DBError {
    no?: number;
    code?: string;
    syscall?: string;
    hostname?: string;
}

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(logger);

app.use(cors);

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/users', userRoutes);

app.use('/posts', postRoutes);

app.use('/comments', commentRoutes);

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err: DBError) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'dbErrLog.log');
});