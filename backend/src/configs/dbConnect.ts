import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(<string>process.env.DATABASE_URI);
    } catch (err) {
        console.log(err);
    }
}