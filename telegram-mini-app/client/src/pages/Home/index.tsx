import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

// Components
import BottomNav from '../../components/common/BottomNav';
import BusinessCard from '../../components/Business/BusinessCard';
import IncomeCounter from '../../components/common/IncomeCounter';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';

// Context
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { useBusinesses } from '../../hooks/useBusinesses';
import { useDrops } from '../../hooks/useDrops';
import { Business } from '../../types/business';
import BusinessService from '../../api/business';

// Интерфейс для уведомлений
interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Состояние для уведомлений
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: '',
    type: 'info'
  });
  
  // Используем GameContext вместо локального состояния
  const { 
    balance, 
    totalIncomePerHour, 
    ownedBusinesses,
    getMostProfitableBusiness,
    setBalance
  } = useGame();

  // Пользователь и функции обновления
  const { user, isAuthenticated, updateUser } = useAuth();
  
  // Получаем данные о бизнесах
  const { 
    businesses, 
    isLoading: businessesLoading, 
    collectAllIncome 
  } = useBusinesses();
  
  // Получаем данные о дропах
  const { 
    stats: dropsStats, 
    isLoading: dropsLoading 
  } = useDrops();

  // Получаем самый прибыльный бизнес
  const mostProfitableBusiness = getMostProfitableBusiness();

  // Вычисляем общий доход в час (от бизнесов и дропов)
  const totalIncome = useMemo(() => {
    // Используем доход из GameContext
    const businessIncome = totalIncomePerHour || 0;
    // Добавляем доход от дропов, если он доступен
    const dropIncome = dropsStats ? dropsStats.income_per_hour : 0;
    return businessIncome + dropIncome;
  }, [totalIncomePerHour, dropsStats]);

  // Добавляем состояние для отслеживания текущего дохода в реальном времени
  const [currentIncome, setCurrentIncome] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const incomePerSecond = totalIncome / 3600;

  // Эффект для обновления текущего дохода каждую секунду
  useEffect(() => {
    const updateIncome = () => {
      const now = Date.now();
      const hourFraction = (now - lastUpdateTime) / 3600000; // Доля часа (в часах)
      const newIncome = currentIncome + totalIncome * hourFraction;
      setCurrentIncome(newIncome);
      setLastUpdateTime(now);
    };

    const intervalId = setInterval(updateIncome, 1000);
    return () => clearInterval(intervalId);
  }, [currentIncome, totalIncome, lastUpdateTime]);

  const handleInviteFriends = () => {
    // Здесь будет логика приглашения друзей
    alert('Функция приглашения друзей будет доступна позже');
  };

  const navigateToBusiness = () => {
    navigate('/business');
  };

  const navigateToDarknet = () => {
    navigate('/darknet');
  };

  const navigateToDrops = () => {
    navigate('/drops');
  };

  // Функция для сбора дохода от всех бизнесов
  const handleCollectIncome = useCallback(async () => {
    try {
      if (currentIncome <= 0) return;
      
      // Используем метод collectBusinessIncome из API бизнесов
      const result = await BusinessService.collectBusinessIncome();
      
      if (result && result.amount) {
        const collectedAmount = Math.floor(currentIncome);
        
        setNotification({
          show: true,
          message: `Собрано ${collectedAmount.toLocaleString()} монет`,
          type: 'success'
        });
        
        // Обновляем баланс через setBalance
        const newBalance = balance + collectedAmount;
        setBalance(newBalance);
        
        // Сбрасываем текущий доход
        setCurrentIncome(0);
        
        // Обновляем данные пользователя если доступно
        if (user && updateUser) {
          updateUser({ balance: newBalance });
        }
      } else {
        setNotification({
          show: true,
          message: 'Не удалось собрать доход',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error collecting income:', error);
      setNotification({
        show: true,
        message: 'Произошла ошибка',
        type: 'error'
      });
    }
  }, [currentIncome, balance, setBalance, user, updateUser]);

  return (
    <div className="home-page">
      {/* Показываем уведомление, если оно активно */}
      {notification.show && (
        <div className={`notification notification--${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="home-page__balance">
        <h1>{user && user.balance ? user.balance.toLocaleString() : balance.toLocaleString()}</h1>
        <p>монет</p>
      </div>
      
      <IncomeCounter incomePerHour={totalIncome} />
      
      <div className="home-page__actions">
        <Button 
          variant="primary" 
          size="large" 
          fullWidth 
          icon="👥" 
          onClick={handleInviteFriends}
        >
          Пригласить друзей
        </Button>
      </div>
      
      {/* Кнопки быстрого доступа теперь размещены над блоком бизнесов */}
      <div className="home-page__quick-actions">
        <div className="home-page__quick-action" onClick={navigateToBusiness}>
          <div className="home-page__quick-action-icon">
            <Icon name="business" size="lg" />
          </div>
          <div className="home-page__quick-action-label">Бизнесы</div>
        </div>
        <div className="home-page__quick-action" onClick={navigateToDrops}>
          <div className="home-page__quick-action-icon">
            <Icon name="drops" size="lg" />
          </div>
          <div className="home-page__quick-action-label">Дропы</div>
        </div>
        <div className="home-page__quick-action" onClick={navigateToDarknet}>
          <div className="home-page__quick-action-icon">
            <Icon name="darknet" size="lg" />
          </div>
          <div className="home-page__quick-action-label">Даркнет</div>
        </div>
      </div>
      
      {/* Блок с бизнесами всегда показывается, даже если бизнесов нет */}
      <div className="home-page__section">
        <div className="home-page__section-header">
          <h2>Ваши бизнесы</h2>
          <span className="home-page__section-action" onClick={navigateToBusiness}>
            Все бизнесы
          </span>
        </div>
        <div className="home-page__business-list">
          {ownedBusinesses.length > 0 && mostProfitableBusiness ? (
            <BusinessCard 
              key={mostProfitableBusiness.business_id} 
              business={mostProfitableBusiness} 
              onClick={navigateToBusiness}
            />
          ) : (
            <div className="home-page__empty-business">
              <p>У вас пока нет бизнесов</p>
              <Button 
                variant="accent" 
                onClick={navigateToBusiness}
              >
                Купить первый бизнес
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Home;