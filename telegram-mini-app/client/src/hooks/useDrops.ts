import { useState, useEffect, useCallback } from 'react';
import DropsService from '../api/drops';
import { Drop } from '../types/drops';
import { useAuth } from '../context/AuthContext';

interface UseDropsReturn {
  drops: Drop[];
  stats: {
    total: number;
    active: number;
    lost_24h: number;
    income_per_hour: number;
  };
  isLoading: boolean;
  error: string | null;
  inviteLink: string | null;
  refreshDrops: () => Promise<void>;
  generateInviteLink: () => Promise<string>;
  upgradeUserDrop: (dropId: string) => Promise<boolean>;
}

export const useDrops = (): UseDropsReturn => {
  const { user, updateUser } = useAuth();
  const [drops, setDrops] = useState<Drop[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    active: number;
    lost_24h: number;
    income_per_hour: number;
  }>({
    total: 0,
    active: 0,
    lost_24h: 0,
    income_per_hour: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  // Загрузка дропов пользователя
  const loadUserDrops = useCallback(async () => {
    try {
      const data = await DropsService.getUserDrops();
      setDrops(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить дропы');
      console.error('Error loading drops:', err);
    }
  }, []);

  // Загрузка статистики дропов
  const loadDropsStats = useCallback(async () => {
    try {
      const data = await DropsService.getDropsStats();
      setStats(data);
    } catch (err) {
      console.error('Error loading drops stats:', err);
    }
  }, []);

  // Обновление всех данных о дропах
  const refreshDrops = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([loadUserDrops(), loadDropsStats()]);
    setIsLoading(false);
  }, [loadUserDrops, loadDropsStats]);

  // Генерация ссылки для приглашения
  const generateInviteLink = async (): Promise<string> => {
    setIsLoading(true);
    try {
      const { inviteLink: newLink } = await DropsService.createInviteLink();
      setInviteLink(newLink);
      return newLink;
    } catch (err) {
      setError('Не удалось создать пригласительную ссылку');
      console.error('Error generating invite link:', err);
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  // Улучшение дропа
  const upgradeUserDrop = async (dropId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const drop = drops.find(d => d.drop_id === dropId);
      if (!drop) {
        throw new Error('Дроп не найден');
      }
      
      // Расчет стоимости улучшения дропа
      const upgradeCost = Math.floor(100 * Math.pow(1.5, drop.level));
      
      // Проверка на достаточность средств
      if (user && user.balance < upgradeCost) {
        throw new Error('Недостаточно средств для улучшения');
      }
      
      const upgradedDrop = await DropsService.upgradeDrop(dropId);
      
      // Обновляем список дропов и баланс пользователя
      if (user) {
        updateUser({ balance: user.balance - upgradeCost });
      }
      
      setDrops(prev => 
        prev.map(d => d.drop_id === dropId ? upgradedDrop : d)
      );
      
      // Обновляем статистику
      await loadDropsStats();
      
      return true;
    } catch (err) {
      setError('Не удалось улучшить дроп');
      console.error('Error upgrading drop:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    refreshDrops();
  }, [refreshDrops]);

  return {
    drops,
    stats,
    isLoading,
    error,
    inviteLink,
    refreshDrops,
    generateInviteLink,
    upgradeUserDrop
  };
}; 