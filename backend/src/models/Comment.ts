import mongoose from 'mongoose';

import { IComment } from '@utilities/types';

const commentSchema = new mongoose.Schema<IComment>(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        content: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IComment>('Comment', commentSchema);