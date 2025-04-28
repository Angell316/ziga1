import React, { useState, useMemo } from 'react';
import './Drops.scss';
import BottomNav from '../../components/common/BottomNav';

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
  
  return (
    <div className="drops-page">
      <div className="drops-page__header">
        <h1>Дропы</h1>
        <div className="drops-page__balance">
          Баланс: <span>10,450₽</span>
        </div>
      </div>

      {/* Статистика */}
      <div className="drops-page__stats">
        <div className="drops-page__stats-row">
          <div className="drops-page__stat-item">
            <div className="drops-page__stat-value">24</div>
            <div className="drops-page__stat-label">Всего</div>
          </div>
          <div className="drops-page__stat-item drops-page__stat-item--warning">
            <div className="drops-page__stat-value">3</div>
            <div className="drops-page__stat-label">Потеряно (24ч)</div>
          </div>
        </div>
        <div className="drops-page__stats-row">
          <div className="drops-page__stat-item drops-page__stat-item--income">
            <div className="drops-page__stat-value">1,240₽</div>
            <div className="drops-page__stat-label">Доход/час</div>
          </div>
        </div>
      </div>

      {/* Табы */}
      <div className="drops-page__tabs">
        <button 
          className={`drops-page__tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Информация
        </button>
        <button 
          className={`drops-page__tab ${activeTab === 'drops' ? 'active' : ''}`}
          onClick={() => setActiveTab('drops')}
        >
          Мои дропы
        </button>
      </div>

      {/* Содержимое табов */}
      {activeTab === 'info' ? (
        <div className="drops-page__info-content">
          <article className="drops-page__article">
            <h2>О дропах</h2>
            <p className="drops-page__article-intro">
              Дропы — приглашённые вами пользователи, которые приносят пассивный доход.
            </p>

            <h3>Как это работает</h3>
            <p>
              Каждый приглашённый друг становится вашим дропом и приносит базовый доход 10₽ в час. 
              Чем выше уровень и качество дропа, тем больше прибыли вы получаете.
            </p>

            <h3>Уровни дропов</h3>
            <div className="drops-page__levels">
              {dropTypes.map((type) => (
                <div key={type.level} className="drops-page__level-item">
                  <div className="drops-page__level-badge">{type.level}</div>
                  <div className="drops-page__level-income">
                    {calculateIncome(type.baseIncome, type.level, type.multiplier)}₽/ч
                  </div>
                  <div className="drops-page__level-multi">×{type.multiplier}</div>
                </div>
              ))}
            </div>

            <div className="drops-page__formula">
              Доход = 10₽ × Уровень × Множитель
            </div>

            <h3>Как приглашать друзей</h3>
            <p>
              Просто поделитесь ссылкой и получайте доход от каждого приглашённого друга.
            </p>

            <div className="drops-page__invite-button">
              <button className="button button--accent">Пригласить</button>
            </div>

            <h3>Советы</h3>
            <ul className="drops-page__tips-list">
              <li>Проверяйте дропы ежедневно, чтобы видеть их активность</li>
              <li>Чем больше дропов, тем выше ваш пассивный доход</li>
              <li>Пользователи становятся неактивными, если не заходят в игру 24 часа</li>
              <li>Дроп повышает свой уровень по мере активности в игре</li>
            </ul>
          </article>
        </div>
      ) : (
        <div className="drops-page__drops-list">
          {/* Фильтр дропов */}
          <div className="drops-page__filter">
            <button 
              className={`drops-page__filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              Все
            </button>
            <button 
              className={`drops-page__filter-btn ${activeFilter === 'level' ? 'active' : ''}`}
              onClick={() => handleFilterChange('level')}
            >
              Уровень {activeFilter === 'level' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              className={`drops-page__filter-btn ${activeFilter === 'income' ? 'active' : ''}`}
              onClick={() => handleFilterChange('income')}
            >
              Доход {activeFilter === 'income' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
          </div>
          
          {/* Карточки дропов */}
          {sortedDrops.length > 0 ? (
            sortedDrops.map(drop => (
              <div className="drop-card" key={drop.id}>
                <div className="drop-card__info">
                  <div className="drop-card__name">{drop.name}</div>
                  <div className="drop-card__stats">
                    <div className="drop-card__level">LVL {drop.level}</div>
                    <div className="drop-card__income">{drop.income}₽/ч</div>
                  </div>
                  <div className="drop-card__date">С {drop.date}</div>
                </div>
                <div className="drop-card__actions">
                  <button className="button button--small button--outline">Детали</button>
                </div>
              </div>
            ))
          ) : (
            <div className="drops-page__empty">
              <p>У вас пока нет дропов</p>
              <button className="button button--accent">Пригласить друзей</button>
            </div>
          )}
        </div>
      )}
      
      {/* Нижнее меню навигации */}
      <BottomNav />
    </div>
  );
};

export default DropsPage; 