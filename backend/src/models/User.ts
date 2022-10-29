import mongoose from 'mongoose';

interface IUser {
    username: string;
    password: string;
    email: string;
    status: 'Pending' | 'Active';
    expiredIn: Date | null;
}

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
        status: {
            type: String,
            default: "Pending",
            required: true,
        },
        expiredIn: {
            type: Date,
            default: Date.now,
            expires: 300
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', userSchema);