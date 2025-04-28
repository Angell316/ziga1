import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './styles/global.scss';

// Pages
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import BusinessPage from './pages/Business';
import DropsPage from './pages/Drops';

// Telegram utils
import { enableBackButton, disableBackButton } from './utils/telegram';

// Game Context
import { GameProvider } from './context/GameContext';

// Импорт Telegram WebApp API
declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

// Проверка на мобильное устройство
const isMobileDevice = () => {
  return (window.innerWidth <= 768) || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Функция для активации полноэкранного режима
const activateFullscreen = (tg: any) => {
  if (typeof tg.expand === 'function') {
    tg.expand();
  }
  
  if (typeof tg.disableVerticalSwipes === 'function') {
    tg.disableVerticalSwipes();
  }
  
  if (typeof tg.ready === 'function') {
    tg.ready();
  }
  
  setTimeout(() => {
    if (typeof tg.requestFullscreen === 'function') {
      tg.requestFullscreen();
    } else if (typeof tg.requestFullScreen === 'function') {
      tg.requestFullScreen();
    } else if (typeof tg.setFullScreenHeight === 'function') {
      tg.setFullScreenHeight(true);
    } else if (typeof tg.setInvoiceOpened === 'function') {
      tg.setInvoiceOpened(true);
    }
  }, 1);
};

// Компонент для управления навигацией и кнопкой назад
const NavigationManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Проверка, находимся ли мы на главной странице или экране загрузки
    const isMainPage = location.pathname === '/home' || location.pathname === '/';
    
    if (isMainPage) {
      // На главной странице скрываем кнопку назад
      disableBackButton();
    } else {
      // На остальных страницах показываем кнопку назад и 
      // настраиваем возврат на предыдущую страницу
      enableBackButton(() => {
        if (location.pathname === '/') {
          // Для экрана загрузки нет возврата
          return;
        }
        // Возвращаемся на главную или предыдущую страницу
        navigate(-1);
      });
    }
    
    // При размонтировании компонента убираем кнопку назад
    return () => {
      disableBackButton();
    };
  }, [location.pathname, navigate]);
  
  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Инициализация Telegram Mini App
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      
      // Настройка темы и цветов в соответствии с Telegram
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color', 
        webApp.themeParams.bg_color || '#121212'
      );
      
      document.documentElement.style.setProperty(
        '--tg-theme-text-color', 
        webApp.themeParams.text_color || '#ffffff'
      );
      
      // Активация полноэкранного режима только на мобильных устройствах
      if (isMobileDevice()) {
        const tg = window.Telegram.WebApp;
        
        activateFullscreen(tg);
        
        // Обработчик для восстановления полноэкранного режима при возврате на вкладку
        const visibilityHandler = () => {
          if (!document.hidden) {
            activateFullscreen(tg);
          }
        };
        
        // Обработчики для предотвращения скроллинга
        const touchMoveHandler = (e: TouchEvent) => {
          if (e.touches[0] && 
              Math.abs((e.touches[0] as any).clientY - (e.touches[0] as any).startClientY) > 
              Math.abs((e.touches[0] as any).clientX - (e.touches[0] as any).startClientX)) {
            e.preventDefault();
          }
        };
        
        const touchStartHandler = (e: TouchEvent) => {
          if (e.touches[0]) {
            (e.touches[0] as any).startClientY = e.touches[0].clientY;
            (e.touches[0] as any).startClientX = e.touches[0].clientX;
          }
        };
        
        document.addEventListener('visibilitychange', visibilityHandler);
        document.addEventListener('touchmove', touchMoveHandler, { passive: false });
        document.addEventListener('touchstart', touchStartHandler, { passive: true });
        
        return () => {
          document.removeEventListener('visibilitychange', visibilityHandler);
          document.removeEventListener('touchmove', touchMoveHandler);
          document.removeEventListener('touchstart', touchStartHandler);
        };
      }
    }
  }, []);

  return (
    <GameProvider>
      <Router>
        <NavigationManager />
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/drops" element={<DropsPage />} />
          <Route path="/darknet" element={<div className="placeholder-page">Даркнет (в разработке)</div>} />
          <Route path="/shop" element={<div className="placeholder-page">Магазин (в разработке)</div>} />
          <Route path="/profile" element={<div className="placeholder-page">Профиль (в разработке)</div>} />
          <Route path="/rating" element={<div className="placeholder-page">Рейтинг (в разработке)</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App; 