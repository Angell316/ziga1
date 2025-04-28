import { api } from './index';

// Заглушка для API магазина (будет реализовано позже)
export const getShopItems = async (): Promise<any[]> => {
  // TODO: Реализовать после создания бэкенда для магазина
  return [];
};

export const purchaseShopItem = async (itemId: string): Promise<any> => {
  // TODO: Реализовать после создания бэкенда для магазина
  throw new Error('Функционал магазина пока недоступен');
}; 