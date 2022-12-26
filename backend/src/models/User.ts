import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

import { IUser } from '@utilities/types';

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            default: null
        },
        email: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: null
        },
        background: {
            type: String,
            default: null
        },
        about: {
            type: String,
            default: ''
        },
        discussions: {
            type: Array<mongoose.Schema.Types.ObjectId>,
            default: []
        },
        connections: {
            type: Array<mongoose.Schema.Types.ObjectId>,
            default: []
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
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', userSchema);