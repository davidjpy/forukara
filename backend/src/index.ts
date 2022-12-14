require('dotenv').config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';

import { connectDB } from '@configs/dbConnect';
import { corsOptions } from '@configs/corsOptions';
import { logEvents, logger } from '@middlewares/logger';
import { errorHandler } from '@middlewares/errorHandler';
import commentRoutes from '@routes/commentRoutes';
import postRoutes from '@routes/postRoutes';
import userRoutes from '@routes/userRoutes'
import authRoutes from '@routes/authRoutes';
import { DBError } from '@utilities/types';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);

app.use('/posts', postRoutes);

app.use('/comments', commentRoutes);

app.use('/auth', authRoutes);

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err: DBError) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'dbErrLog.log');
});