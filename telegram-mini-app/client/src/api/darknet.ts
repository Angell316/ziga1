import { api } from './index';

// Заглушка для API даркнета (будет реализовано позже)
export const getDarknetBusinesses = async (): Promise<any[]> => {
  // TODO: Реализовать после создания бэкенда для даркнета
  return [];
};

export const getDarknetProtectionLevels = async (): Promise<any[]> => {
  // TODO: Реализовать после создания бэкенда для даркнета
  return [];
};

export const purchaseDarknetBusiness = async (businessId: string): Promise<any> => {
  // TODO: Реализовать после создания бэкенда для даркнета
  throw new Error('Функционал даркнета пока недоступен');
};

export const upgradeProtection = async (level: number): Promise<any> => {
  // TODO: Реализовать после создания бэкенда для даркнета
  throw new Error('Функционал даркнета пока недоступен');
}; 