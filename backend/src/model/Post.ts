import mongoose, { ObjectId } from 'mongoose';

interface IPost {
    user: ObjectId;
    title: string;
    content: string;
}

const postSchema = new mongoose.Schema<IPost>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPost>('Post', postSchema);