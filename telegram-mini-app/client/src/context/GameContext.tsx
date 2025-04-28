import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Business, AvailableBusiness } from '../types/business';
import { Drop } from '../types/drops';

// Определение типа контекста
interface GameContextType {
  balance: number;
  setBalance: (balance: number) => void;
  ownedBusinesses: Business[];
  setOwnedBusinesses: (businesses: Business[]) => void;
  availableBusinesses: AvailableBusiness[];
  setAvailableBusinesses: (businesses: AvailableBusiness[]) => void;
  totalIncomePerHour: number;
  addBusiness: (business: Business) => void;
  removeBusiness: (businessId: string) => void;
  updateBusiness: (updatedBusiness: Business) => void;
  getMostProfitableBusiness: () => Business | null;
  
  // Добавляем функционал для дропов
  drops: Drop[];
  setDrops: (drops: Drop[]) => void;
  totalDropsIncome: number;
  addDrop: (drop: Drop) => void;
  removeDrop: (dropId: string) => void;
  upgradeDrop: (dropId: string, cost: number) => boolean;
}

// Создание контекста
const GameContext = createContext<GameContextType | undefined>(undefined);

// Провайдер контекста
interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState<number>(1000);
  const [ownedBusinesses, setOwnedBusinesses] = useState<Business[]>([]);
  const [availableBusinesses, setAvailableBusinesses] = useState<AvailableBusiness[]>([]);
  const [totalIncomePerHour, setTotalIncomePerHour] = useState<number>(0);
  
  // Добавляем состояние для дропов
  const [drops, setDrops] = useState<Drop[]>([]);
  const [totalDropsIncome, setTotalDropsIncome] = useState<number>(0);

  // Рассчитываем общий доход от всех бизнесов
  useEffect(() => {
    const total = ownedBusinesses.reduce((sum, business) => sum + business.income_per_hour, 0);
    setTotalIncomePerHour(total);
  }, [ownedBusinesses]);
  
  // Рассчитываем общий доход от всех дропов
  useEffect(() => {
    const total = drops.reduce((sum, drop) => sum + drop.income_per_hour, 0);
    setTotalDropsIncome(total);
  }, [drops]);

  // Симуляция поступления дохода
  useEffect(() => {
    const incomeInterval = setInterval(() => {
      if (totalIncomePerHour > 0 || totalDropsIncome > 0) {
        setBalance(prevBalance => {
          const businessIncomePerSecond = totalIncomePerHour / 3600;
          const dropsIncomePerSecond = totalDropsIncome / 3600;
          const totalIncomePerSecond = businessIncomePerSecond + dropsIncomePerSecond;
          return parseFloat((prevBalance + totalIncomePerSecond).toFixed(2));
        });
      }
    }, 1000);

    return () => clearInterval(incomeInterval);
  }, [totalIncomePerHour, totalDropsIncome]);

  // Функции для работы с бизнесами
  const addBusiness = (business: Business) => {
    setOwnedBusinesses(prev => [...prev, business]);
  };

  const removeBusiness = (businessId: string) => {
    setOwnedBusinesses(prev => prev.filter(b => b.business_id !== businessId));
  };

  const updateBusiness = (updatedBusiness: Business) => {
    setOwnedBusinesses(prev => 
      prev.map(b => b.business_id === updatedBusiness.business_id ? updatedBusiness : b)
    );
  };

  const getMostProfitableBusiness = (): Business | null => {
    if (ownedBusinesses.length === 0) return null;
    
    return ownedBusinesses.reduce((mostProfitable, current) => 
      current.income_per_hour > mostProfitable.income_per_hour ? current : mostProfitable
    , ownedBusinesses[0]);
  };
  
  // Функции для работы с дропами
  const addDrop = (drop: Drop) => {
    setDrops(prev => [...prev, drop]);
  };
  
  const removeDrop = (dropId: string) => {
    setDrops(prev => prev.filter(d => d.drop_id !== dropId));
  };
  
  const upgradeDrop = (dropId: string, cost: number): boolean => {
    // Проверяем, достаточно ли средств
    if (balance < cost) {
      return false;
    }
    
    // Обновляем баланс
    setBalance(prevBalance => prevBalance - cost);
    
    // Обновляем уровень дропа и его доходность
    setDrops(prev => 
      prev.map(drop => {
        if (drop.drop_id === dropId) {
          const newLevel = drop.level + 1;
          // Увеличиваем доход в зависимости от нового уровня
          const newIncomePerHour = drop.income_per_hour * 1.5;
          
          return {
            ...drop,
            level: newLevel,
            income_per_hour: newIncomePerHour
          };
        }
        return drop;
      })
    );
    
    return true;
  };

  return (
    <GameContext.Provider value={{
      balance,
      setBalance,
      ownedBusinesses,
      setOwnedBusinesses,
      availableBusinesses,
      setAvailableBusinesses,
      totalIncomePerHour,
      addBusiness,
      removeBusiness,
      updateBusiness,
      getMostProfitableBusiness,
      
      // Добавляем функционал для дропов
      drops,
      setDrops,
      totalDropsIncome,
      addDrop,
      removeDrop,
      upgradeDrop
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Хук для использования контекста
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext; 