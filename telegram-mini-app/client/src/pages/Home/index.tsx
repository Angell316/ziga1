import React from 'react';
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

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Используем GameContext вместо локального состояния
  const { 
    balance, 
    totalIncomePerHour, 
    ownedBusinesses,
    getMostProfitableBusiness
  } = useGame();
  
  // Получаем самый прибыльный бизнес
  const mostProfitableBusiness = getMostProfitableBusiness();

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

  return (
    <div className="home-page">
      <div className="home-page__balance">
        <h1>{balance.toFixed(2)}</h1>
        <p>Ваш баланс</p>
      </div>
      
      <IncomeCounter incomePerHour={totalIncomePerHour} />
      
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