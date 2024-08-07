import mongoose from 'mongoose';
import { db_config } from '../config';

const connectDB = async () : Promise<void> => {
  try {
    await mongoose.connect(`mongodb://${db_config.user}:${db_config.password}@${db_config.host}:${db_config.port}`,{
      dbName: 'Schedulr',
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;