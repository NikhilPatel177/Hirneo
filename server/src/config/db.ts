import env from '@config/env.js';
import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('Db connected ✅');
  } catch (error) {
    console.log('Db connection error :', error);
    process.exit(1);
  }
};
