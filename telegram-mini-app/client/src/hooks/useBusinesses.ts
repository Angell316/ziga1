import { useState, useEffect, useCallback } from 'react';
import BusinessService from '../api/business';
import { Business, AvailableBusiness } from '../types/business';
import { useAuth } from '../context/AuthContext';

interface UseBusinessesReturn {
  businesses: Business[];
  availableBusinesses: AvailableBusiness[];
  isLoading: boolean;
  error: string | null;
  refreshBusinesses: () => Promise<void>;
  purchaseNewBusiness: (businessId: string) => Promise<boolean>;
  upgradeExistingBusiness: (businessId: string) => Promise<boolean>;
  collectAllIncome: () => Promise<number>;
}

export const useBusinesses = (): UseBusinessesReturn => {
  const { user, updateUser } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [availableBusinesses, setAvailableBusinesses] = useState<AvailableBusiness[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка бизнесов пользователя
  const loadUserBusinesses = useCallback(async () => {
    try {
      const data = await BusinessService.getUserBusinesses();
      setBusinesses(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить бизнесы');
      console.error('Error loading businesses:', err);
    }
  }, []);

  // Загрузка доступных для покупки бизнесов
  const loadAvailableBusinesses = useCallback(async () => {
    try {
      const data = await BusinessService.getAvailableBusinesses();
      setAvailableBusinesses(data);
    } catch (err) {
      console.error('Error loading available businesses:', err);
    }
  }, []);

  // Обновление всех данных о бизнесах
  const refreshBusinesses = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([loadUserBusinesses(), loadAvailableBusinesses()]);
    setIsLoading(false);
  }, [loadUserBusinesses, loadAvailableBusinesses]);

  // Покупка нового бизнеса
  const purchaseNewBusiness = async (businessId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newBusiness = await BusinessService.purchaseBusiness(businessId);
      
      // Обновляем список бизнесов и баланс пользователя
      await refreshBusinesses();
      
      if (user) {
        const cost = availableBusinesses.find(b => b.id === businessId)?.initial_cost || 0;
        updateUser({ 
          balance: user.balance - cost,
          businesses: [...user.businesses, newBusiness.business_id]
        });
      }
      
      return true;
    } catch (err) {
      setError('Не удалось купить бизнес');
      console.error('Error purchasing business:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Улучшение существующего бизнеса
  const upgradeExistingBusiness = async (businessId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const business = businesses.find(b => b.business_id === businessId);
      if (!business) {
        throw new Error('Бизнес не найден');
      }
      
      const upgradedBusiness = await BusinessService.upgradeBusiness(businessId);
      
      // Обновляем список бизнесов и баланс пользователя
      if (user) {
        updateUser({ balance: user.balance - business.upgrade_cost });
      }
      
      setBusinesses(prev => 
        prev.map(b => b.business_id === businessId ? upgradedBusiness : b)
      );
      
      return true;
    } catch (err) {
      setError('Не удалось улучшить бизнес');
      console.error('Error upgrading business:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Сбор дохода от всех бизнесов
  const collectAllIncome = async (): Promise<number> => {
    setIsLoading(true);
    try {
      const { amount } = await BusinessService.collectBusinessIncome();
      
      // Обновляем баланс пользователя
      if (user) {
        updateUser({ balance: user.balance + amount });
      }
      
      return amount;
    } catch (err) {
      setError('Не удалось собрать доход');
      console.error('Error collecting income:', err);
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    refreshBusinesses();
  }, [refreshBusinesses]);

  return {
    businesses,
    availableBusinesses,
    isLoading,
    error,
    refreshBusinesses,
    purchaseNewBusiness,
    upgradeExistingBusiness,
    collectAllIncome
  };
}; 