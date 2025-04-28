import { api } from './index';
import { Business, AvailableBusiness, BusinessUpgrade } from '../types/business';

// Создаем объект с методами для работы с бизнесами
const BusinessService = {
  /**
   * Получение всех бизнесов пользователя
   */
  getUserBusinesses: async (): Promise<Business[]> => {
    const response = await api.get('/business/user');
    return response.data;
  },

  /**
   * Получение доступных для покупки бизнесов
   */
  getAvailableBusinesses: async (): Promise<AvailableBusiness[]> => {
    const response = await api.get('/business/available');
    return response.data;
  },

  /**
   * Получение информации о бизнесе по ID
   */
  getBusinessById: async (businessId: string): Promise<Business> => {
    const response = await api.get(`/business/${businessId}`);
    return response.data;
  },

  /**
   * Покупка нового бизнеса
   */
  purchaseBusiness: async (businessId: string): Promise<Business> => {
    const response = await api.post(`/business/${businessId}/purchase`);
    return response.data;
  },

  /**
   * Улучшение существующего бизнеса
   */
  upgradeBusiness: async (businessId: string): Promise<Business> => {
    const response = await api.post(`/business/${businessId}/upgrade`);
    return response.data;
  },

  /**
   * Сбор дохода от всех бизнесов
   */
  collectBusinessIncome: async (): Promise<{ amount: number }> => {
    const response = await api.post('/business/collect-income');
    return response.data;
  },

  /**
   * Расчет текущего дохода от всех бизнесов
   */
  calculateBusinessIncome: async (): Promise<{ total: number; businesses: { [key: string]: number } }> => {
    const response = await api.get('/business/income');
    return response.data;
  },

  /**
   * Получение доступных улучшений для бизнеса
   */
  getBusinessUpgrades: async (businessId: string): Promise<BusinessUpgrade[]> => {
    const response = await api.get(`/business/${businessId}/upgrades`);
    return response.data;
  }
};

// Экспорт объекта сервиса
export default BusinessService;

// Для обратной совместимости экспортируем методы напрямую
export const { 
  getUserBusinesses, 
  getAvailableBusinesses, 
  getBusinessById, 
  purchaseBusiness, 
  upgradeBusiness, 
  collectBusinessIncome, 
  calculateBusinessIncome, 
  getBusinessUpgrades 
} = BusinessService; 