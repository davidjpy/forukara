import mongoose from 'mongoose';

import { IUser } from '@utilities/types';

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        avatar: {
            type: Buffer,
            contentType: String,
            default: null
        },
        background: {
            type: Buffer,
            contentType: String,
            default: null
        },
        status: {
            type: String,
            default: "Pending",
            required: true,
        },
        expiredIn: {
            type: Date,
            default: Date.now,
            expires: 600
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', userSchema);