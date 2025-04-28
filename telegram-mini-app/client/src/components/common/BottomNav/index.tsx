import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.scss';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bottom-nav">
      <div 
        className={`bottom-nav__item ${isActive('/home') ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <div className="bottom-nav__icon">🏠</div>
        <div className="bottom-nav__label">Главная</div>
      </div>
      <div 
        className={`bottom-nav__item ${isActive('/rating') ? 'active' : ''}`}
        onClick={() => navigate('/rating')}
      >
        <div className="bottom-nav__icon">🏆</div>
        <div className="bottom-nav__label">Рейтинг</div>
      </div>
      <div 
        className={`bottom-nav__item ${isActive('/shop') ? 'active' : ''}`}
        onClick={() => navigate('/shop')}
      >
        <div className="bottom-nav__icon">🛒</div>
        <div className="bottom-nav__label">Маркет</div>
      </div>
      <div 
        className={`bottom-nav__item ${isActive('/profile') ? 'active' : ''}`}
        onClick={() => navigate('/profile')}
      >
        <div className="bottom-nav__icon">👤</div>
        <div className="bottom-nav__label">Профиль</div>
      </div>
    </div>
  );
};

export default BottomNav; 