import mongoose from 'mongoose';
import {config} from 'dotenv'
config();
const uri = process.env.MONGO_URI!; // Replace with your MongoDB connection string

if (!uri) {
  throw new Error('MONGO_URI is not defined in .env file');
}

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};