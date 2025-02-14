import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/salon";

export const connectDB = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to DB');
    } catch (error) {
        console.error("Connection error", error);
    }
}


