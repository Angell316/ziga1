import mongoose from 'mongoose';
import config from '../config/environment';
import logger from '../utils/logger';

/**
 * Настройка подключения к MongoDB
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = config.MONGO_URI || 'mongodb://localhost:27017/ecosim';
    
    await mongoose.connect(mongoURI, {
      // Опции подключения
    });
    
    logger.info('MongoDB подключена успешно');
    
    // Настройка обработчиков событий Mongoose
    mongoose.connection.on('error', (err) => {
      logger.error(`Ошибка MongoDB: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB отключена, пытаемся переподключиться...');
      setTimeout(() => connectDB(), 5000);
    });
    
  } catch (error) {
    logger.error(`Ошибка при подключении к MongoDB: ${error}`);
    process.exit(1);
  }
};

/**
 * Закрытие соединения с MongoDB
 */
export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB соединение закрыто');
  } catch (error) {
    logger.error(`Ошибка при закрытии соединения с MongoDB: ${error}`);
  }
};

export default { connectDB, closeDB }; 