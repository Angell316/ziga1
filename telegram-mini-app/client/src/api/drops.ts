import { api } from './index';
import { Drop, DropUpgrade } from '../types/drops';

// Создаем объект с методами работы с дропами
const DropsService = {
  /**
   * Получение всех дропов пользователя
   */
  getUserDrops: async (): Promise<Drop[]> => {
    const response = await api.get('/drops/user');
    return response.data;
  },

  /**
   * Получение информации о дропе по ID
   */
  getDropById: async (dropId: string): Promise<Drop> => {
    const response = await api.get(`/drops/${dropId}`);
    return response.data;
  },

  /**
   * Получение доступных улучшений для дропа
   */
  getDropUpgrades: async (dropId: string): Promise<DropUpgrade[]> => {
    const response = await api.get(`/drops/${dropId}/upgrades`);
    return response.data;
  },

  /**
   * Улучшение дропа
   */
  upgradeDrop: async (dropId: string): Promise<Drop> => {
    const response = await api.post(`/drops/${dropId}/upgrade`);
    return response.data;
  },

  /**
   * Создание пригласительной ссылки для новых дропов
   */
  createInviteLink: async (): Promise<{ inviteLink: string }> => {
    const response = await api.post('/drops/invite-link');
    return response.data;
  },

  /**
   * Получение статистики дропов
   */
  getDropsStats: async (): Promise<{ 
    total: number; 
    active: number; 
    lost_24h: number; 
    income_per_hour: number 
  }> => {
    const response = await api.get('/drops/stats');
    return response.data;
  },

  /**
   * Проверка и активация дропа по пригласительной ссылке
   */
  activateDropInvite: async (inviteCode: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/drops/activate', { inviteCode });
    return response.data;
  },

  /**
   * Расчет текущего дохода от всех дропов
   */
  calculateDropsIncome: async (): Promise<{ total: number; drops: { [key: string]: number } }> => {
    const response = await api.get('/drops/income');
    return response.data;
  }
};

// Экспорт объекта сервиса
export default DropsService;

// Для обратной совместимости экспортируем методы напрямую
export const { 
  getUserDrops, 
  getDropById, 
  getDropUpgrades, 
  upgradeDrop, 
  createInviteLink, 
  getDropsStats, 
  activateDropInvite, 
  calculateDropsIncome 
} = DropsService; 