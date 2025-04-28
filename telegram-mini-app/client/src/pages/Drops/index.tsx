import React, { useState, useMemo } from 'react';
import './Drops.scss';
import BottomNav from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { useDrops } from '../../hooks/useDrops';
import Button from '../../components/common/Button';

// Типы для дропов
interface Drop {
  id: number;
  name: string;
  level: number;
  income: number;
  date: string;
}

const DropsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'drops'>('drops');
  const [activeFilter, setActiveFilter] = useState<'all' | 'level' | 'income'>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Типы дропов по множителю качества
  const dropTypes = [
    { level: 1, multiplier: 1.0, baseIncome: 10 },
    { level: 2, multiplier: 1.5, baseIncome: 10 },
    { level: 3, multiplier: 2.0, baseIncome: 10 },
    { level: 4, multiplier: 2.5, baseIncome: 10 },
    { level: 5, multiplier: 3.0, baseIncome: 10 },
  ];

  // Вычисление дохода от дропа
  const calculateIncome = (baseIncome: number, level: number, multiplier: number) => {
    return Math.round(baseIncome * level * multiplier);
  };

  // Примеры дропов
  const dropsList: Drop[] = [
    { id: 1, name: 'Алексей', level: 3, income: 500, date: '12.05.2023' },
    { id: 2, name: 'Сергей', level: 2, income: 250, date: '15.05.2023' },
    { id: 3, name: 'Иван', level: 5, income: 1000, date: '20.04.2023' },
    { id: 4, name: 'Мария', level: 1, income: 100, date: '01.06.2023' },
    { id: 5, name: 'Анна', level: 4, income: 750, date: '05.05.2023' },
  ];

  // Обработчик переключения фильтра
  const handleFilterChange = (filter: 'all' | 'level' | 'income') => {
    if (activeFilter === filter) {
      // Переключение направления сортировки при повторном клике
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setActiveFilter(filter);
      setSortDirection('desc'); // По умолчанию сортировка по убыванию
    }
  };

  // Отсортированный список дропов
  const sortedDrops = useMemo(() => {
    const dropsCopy = [...dropsList];
    
    if (activeFilter === 'all') {
      return dropsCopy;
    }
    
    return dropsCopy.sort((a, b) => {
      const valueA = activeFilter === 'level' ? a.level : a.income;
      const valueB = activeFilter === 'level' ? b.level : b.income;
      
      return sortDirection === 'asc' 
        ? valueA - valueB 
        : valueB - valueA;
    });
  }, [dropsList, activeFilter, sortDirection]);
  
  // Получаем данные пользователя
  const { user } = useAuth();
  
  // Получаем данные о дропах
  const { 
    drops, 
    stats,
    isLoading, 
    error,
    inviteLink,
    generateInviteLink,
    upgradeUserDrop
  } = useDrops();
  
  // Состояние для уведомлений
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info'
  });

  // Генерация ссылки для приглашения
  const handleGenerateInviteLink = async () => {
    try {
      const link = await generateInviteLink();
      
      // Показываем ссылку пользователю
      setNotification({
        show: true,
        message: `Ссылка создана: ${link}`,
        type: 'success'
      });
      
      // Копируем ссылку в буфер обмена
      navigator.clipboard.writeText(link).then(() => {
        console.log('Ссылка скопирована в буфер обмена');
      }).catch(err => {
        console.error('Не удалось скопировать ссылку:', err);
      });
      
      // Скрываем уведомление через 5 секунд
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    } catch (error) {
      console.error('Error generating invite link:', error);
      setNotification({
        show: true,
        message: 'Не удалось создать ссылку',
        type: 'error'
      });
      
      // Скрываем уведомление через 3 секунды
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };
  
  // Функция улучшения дропа
  const handleUpgradeDrop = async (dropId: string) => {
    try {
      const success = await upgradeUserDrop(dropId);
      
      if (success) {
        setNotification({
          show: true,
          message: 'Дроп успешно улучшен!',
          type: 'success'
        });
        
        // Скрываем уведомление через 3 секунды
        setTimeout(() => {
          setNotification(prev => ({ ...prev, show: false }));
        }, 3000);
      }
    } catch (error) {
      console.error('Error upgrading drop:', error);
      setNotification({
        show: true,
        message: 'Не удалось улучшить дроп',
        type: 'error'
      });
      
      // Скрываем уведомление через 3 секунды
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  // Функция для отображения качества дропа
  const getDropQualityLabel = (quality: string): string => {
    switch (quality) {
      case 'common': return 'Обычный';
      case 'rare': return 'Редкий';
      case 'epic': return 'Эпический';
      case 'legendary': return 'Легендарный';
      default: return quality;
    }
  };

  // Функция для получения дохода от дропа
  const getDropIncome = (drop: any): number => {
    return drop.income_per_hour * drop.income_multiplier;
  };

  return (
    <div className="drops-page">
      {/* Показываем уведомление, если оно активно */}
      {notification.show && (
        <div className={`notification notification--${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      {/* Показываем баланс пользователя */}
      <div className="drops-page__balance">
        <h2>{user ? user.balance.toLocaleString() : '0'} монет</h2>
      </div>
      
      {/* Показываем статус загрузки или ошибку */}
      {isLoading && <div className="loading">Загрузка дропов...</div>}
      {error && <div className="error">{error}</div>}
      
      {/* Статистика дропов */}
      <div className="drops-stats">
        <div className="drops-stats__item">
          <h3>Всего дропов</h3>
          <p>{stats?.total || 0}</p>
        </div>
        <div className="drops-stats__item">
          <h3>Активные дропы</h3>
          <p>{stats?.active || 0}</p>
        </div>
        <div className="drops-stats__item">
          <h3>Потеряно за 24ч</h3>
          <p>{stats?.lost_24h || 0}</p>
        </div>
        <div className="drops-stats__item">
          <h3>Доход в час</h3>
          <p>{stats?.income_per_hour || 0}</p>
        </div>
      </div>
      
      {/* Кнопка для создания пригласительной ссылки */}
      <div className="drops-page__actions">
        <Button 
          variant="primary"
          fullWidth
          onClick={handleGenerateInviteLink}
          disabled={isLoading}
        >
          Создать пригласительную ссылку
        </Button>
        
        {/* Показываем текущую ссылку, если она есть */}
        {inviteLink && (
          <div className="invite-link">
            <p>Текущая ссылка:</p>
            <div className="invite-link__box" onClick={() => navigator.clipboard.writeText(inviteLink)}>
              {inviteLink}
              <span className="copy-icon">📋</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Список дропов */}
      <div className="drops-page__section">
        <h2>Ваши дропы</h2>
        
        <div className="drops-list">
          {drops.length > 0 ? (
            drops.map(drop => (
              <div key={drop.drop_id} className={`drop-card drop-card--${drop.quality}`}>
                <div className="drop-card__header">
                  <h3>{getDropQualityLabel(drop.quality)}</h3>
                  <span className="drop-level">Уровень {drop.level}</span>
                </div>
                
                <div className="drop-card__body">
                  <p>Доход: {getDropIncome(drop)} / час</p>
                  <p>ID: {drop.invitee_id.substring(0, 8)}...</p>
                  <p>Создан: {new Date(drop.created_at).toLocaleDateString()}</p>
                </div>
                
                <div className="drop-card__footer">
                  <Button 
                    variant="accent"
                    onClick={() => handleUpgradeDrop(drop.drop_id)}
                    disabled={!user || user.balance < Math.floor(100 * Math.pow(1.5, drop.level))}
                  >
                    Улучшить ({Math.floor(100 * Math.pow(1.5, drop.level))} монет)
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="drops-empty">
              <p>У вас пока нет дропов</p>
              <p>Создайте пригласительную ссылку и отправьте друзьям, чтобы получить дропы</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Нижнее меню навигации */}
      <BottomNav />
    </div>
  );
};

export default DropsPage; 