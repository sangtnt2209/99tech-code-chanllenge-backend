import mongoose from 'mongoose';
import Logger from '../shared/utils/logger.util';

export class MongoDbContext {
  public static async connect(): Promise<void> {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/my_database';

    try {
      mongoose.set('strictQuery', true);

      await mongoose.connect(uri);
      Logger.info('MongoDB Connected Successfully');
    } catch (error) {
      Logger.error('MongoDB Connection Error:', error);
      process.exit(1);
    }
  }

  public static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
