import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

import { IUser } from '@utilities/types';

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        preferredName: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            default: null
        },
        email: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            default: ''
        },
        occupation: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        background: {
            type: String,
            default: ''
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