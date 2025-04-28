import { api } from './index';
import { User, IAuthData } from '../types/user';

// Создаем объект с методами аутентификации
const AuthService = {
  /**
   * Авторизация пользователя через Telegram
   */
  authenticateWithTelegram: async (
    telegramData: { id: string; first_name: string; username?: string; photo_url?: string; auth_date: number; hash: string }
  ): Promise<IAuthData> => {
    const response = await api.post('/auth/telegram', telegramData);
    return response.data;
  },

  /**
   * Получение данных текущего пользователя
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Проверка текущего токена
   */
  validateToken: async (): Promise<{ valid: boolean }> => {
    try {
      const response = await api.get('/auth/validate');
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  },

  /**
   * Выход пользователя
   */
  logout: (): void => {
    localStorage.removeItem('authToken');
  }
};

// Экспорт объекта сервиса
export default AuthService;

// Для обратной совместимости экспортируем методы напрямую
export const { authenticateWithTelegram, getCurrentUser, validateToken, logout } = AuthService; 