import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.scss';
import Loader from '../../components/common/Loader';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const loadUserData = async () => {
      try {
        // Здесь будет логика загрузки данных пользователя
        // и инициализация Telegram SDK
        
        // Имитация задержки загрузки
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setLoading(false);
        
        // После загрузки перенаправляем на главную страницу
        setTimeout(() => {
          navigate('/home');
        }, 500);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        // Должна быть обработка ошибки
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="logo-container">
        <div className="logo">
          <span className="eco">ECO</span>
          <span className="sim">SIM</span>
        </div>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default SplashScreen; 