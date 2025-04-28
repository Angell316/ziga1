import dotenv from 'dotenv';

// Загрузка переменных окружения из файла .env
dotenv.config();

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_WEBHOOK_URL?: string;
  REDIS_URL?: string;
  FRONTEND_URL: string;
  LOG_LEVEL: string;
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecosim',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_WEBHOOK_URL: process.env.TELEGRAM_WEBHOOK_URL,
  REDIS_URL: process.env.REDIS_URL,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

export default config; 