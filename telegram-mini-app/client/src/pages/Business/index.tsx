import React, { useState, useEffect } from 'react';
import './Business.scss';

// Components
import BottomNav from '../../components/common/BottomNav';
import BusinessCard from '../../components/Business/BusinessCard';
import AvailableBusinessCard from '../../components/Business/AvailableBusinessCard';
import BusinessFilters from '../../components/Business/BusinessFilters';
import BusinessUpgradeModal from '../../components/Business/BusinessUpgradeModal';
import Button from '../../components/common/Button';

// Types
import { Business, AvailableBusiness, BusinessType } from '../../types/business';

// Context
import { useGame } from '../../context/GameContext';

const BusinessPage: React.FC = () => {
  // Получаем данные и методы из GameContext
  const { 
    balance, 
    setBalance, 
    ownedBusinesses, 
    setOwnedBusinesses, 
    availableBusinesses,
    setAvailableBusinesses
  } = useGame();

  // Состояния для фильтрации и сортировки
  const [activeTab, setActiveTab] = useState<'owned' | 'available'>('owned');
  const [businessType, setBusinessType] = useState<BusinessType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'income' | 'cost' | 'efficiency'>('income');
  
  // Модальное окно для улучшения
  const [upgradeModal, setUpgradeModal] = useState<{ visible: boolean, business?: Business }>({
    visible: false
  });
  
  // При первой загрузке компонента заполняем доступные бизнесы, если список пуст
  useEffect(() => {
    if (availableBusinesses.length === 0) {
      setAvailableBusinesses([
        {
          id: '1',
          name: 'Киоск',
          type: 'legal',
          description: 'Небольшой киоск с прессой и товарами первой необходимости. Минимальные вложения, низкий доход.',
          initial_cost: 500,
          initial_income: 20,
        },
        {
          id: '2',
          name: 'Курьерская служба',
          type: 'legal',
          description: 'Доставка посылок и документов. Низкие вложения, стабильный доход.',
          initial_cost: 1000,
          initial_income: 30,
        },
        {
          id: '3',
          name: 'Магазин',
          type: 'legal',
          description: 'Небольшой магазин с товарами первой необходимости. Стабильный средний доход.',
          initial_cost: 2500,
          initial_income: 150,
        },
        {
          id: '4',
          name: 'Закусочная',
          type: 'legal',
          description: 'Закусочная с фаст-фудом. Высокая проходимость, хороший доход.',
          initial_cost: 5000,
          initial_income: 300,
        },
        {
          id: '5',
          name: 'Мини-казино',
          type: 'darknet',
          description: 'Нелегальное мини-казино. Высокий доход, но риск полицейских рейдов.',
          initial_cost: 7500,
          initial_income: 600,
        },
        {
          id: '6',
          name: 'Автосервис',
          type: 'legal',
          description: 'Ремонт и обслуживание автомобилей. Требует хороших вложений, но приносит стабильный доход.',
          initial_cost: 10000,
          initial_income: 750,
        },
        {
          id: '7',
          name: 'Подпольный бар',
          type: 'darknet',
          description: 'Нелегальное заведение с продажей контрафактного алкоголя. Высокий доход, но высокий риск.',
          initial_cost: 12000,
          initial_income: 950,
        },
        {
          id: '8',
          name: 'Ресторан',
          type: 'legal',
          description: 'Полноценный ресторан с кухней и обслуживанием. Высокие вложения, хороший доход.',
          initial_cost: 20000,
          initial_income: 1500,
        },
        {
          id: '9',
          name: 'Точка сбыта наркотиков',
          type: 'darknet',
          description: 'Нелегальный бизнес по продаже запрещенных веществ. Очень высокий доход, очень высокий риск.',
          initial_cost: 25000,
          initial_income: 2500,
        },
        {
          id: '10',
          name: 'Отель',
          type: 'legal',
          description: 'Гостиничный бизнес. Крупные вложения, высокий доход.',
          initial_cost: 50000,
          initial_income: 4000,
        },
        {
          id: '11',
          name: 'Подпольная лаборатория',
          type: 'darknet',
          description: 'Производство запрещенных веществ. Огромный доход, но максимальный риск.',
          initial_cost: 80000,
          initial_income: 8000,
        },
        {
          id: '12',
          name: 'Торговый центр',
          type: 'legal',
          description: 'Крупный торговый центр с множеством магазинов. Требует огромных вложений, но приносит стабильный высокий доход.',
          initial_cost: 100000,
          initial_income: 9000,
        },
        {
          id: '13',
          name: 'IT-компания',
          type: 'legal',
          description: 'Разработка программного обеспечения и IT-поддержка. Требует квалифицированных кадров, но очень прибыльный бизнес.',
          initial_cost: 40000,
          initial_income: 3500,
        },
        {
          id: '14',
          name: 'Фитнес-клуб',
          type: 'legal',
          description: 'Современный фитнес-центр с тренажерами и групповыми занятиями. Стабильный доход от абонементов.',
          initial_cost: 35000,
          initial_income: 2800,
        },
        {
          id: '15',
          name: 'Сеть ломбардов',
          type: 'legal',
          description: 'Сеть пунктов приема ценностей под залог. Стабильный доход даже в кризисные времена.',
          initial_cost: 30000,
          initial_income: 2400,
        },
        {
          id: '16',
          name: 'Подпольное казино',
          type: 'darknet',
          description: 'Элитный нелегальный игорный дом для состоятельных клиентов. Огромный доход, но высокий риск.',
          initial_cost: 60000,
          initial_income: 6000,
        },
        {
          id: '17',
          name: 'Сеть аптек',
          type: 'legal',
          description: 'Розничная сеть аптек. Стабильный доход в любые времена.',
          initial_cost: 45000,
          initial_income: 3800,
        },
        {
          id: '18',
          name: 'Подпольная типография',
          type: 'darknet',
          description: 'Нелегальное производство документов и денежных купюр. Очень высокий доход при значительном риске.',
          initial_cost: 35000,
          initial_income: 3600,
        },
        {
          id: '19',
          name: 'Майнинг-ферма',
          type: 'legal',
          description: 'Центр для майнинга криптовалют. Требует существенных вложений в оборудование и электроэнергию.',
          initial_cost: 70000,
          initial_income: 6500,
        },
        {
          id: '20',
          name: 'Нелегальная оружейная мастерская',
          type: 'darknet',
          description: 'Производство и продажа нелегального оружия. Колоссальный риск, но и соответствующий доход.',
          initial_cost: 90000,
          initial_income: 9500,
        }
      ]);
    }
  }, [availableBusinesses.length, setAvailableBusinesses]);
  
  // Фильтрация бизнесов по типу
  const filteredOwnedBusinesses = ownedBusinesses.filter(business => 
    businessType === 'all' ? true : business.type === businessType
  );
  
  const filteredAvailableBusinesses = availableBusinesses.filter(business => 
    businessType === 'all' ? true : business.type === businessType
  );
  
  // Сортировка бизнесов
  const sortedOwnedBusinesses = [...filteredOwnedBusinesses].sort((a, b) => {
    if (sortBy === 'income') {
      return b.income_per_hour - a.income_per_hour;
    } else if (sortBy === 'cost') {
      return a.upgrade_cost - b.upgrade_cost;
    } else { // efficiency
      const efficiencyA = a.income_per_hour / a.cost;
      const efficiencyB = b.income_per_hour / b.cost;
      return efficiencyB - efficiencyA;
    }
  });
  
  const sortedAvailableBusinesses = [...filteredAvailableBusinesses].sort((a, b) => {
    if (sortBy === 'income') {
      return b.initial_income - a.initial_income;
    } else if (sortBy === 'cost') {
      return a.initial_cost - b.initial_cost;
    } else { // efficiency
      const efficiencyA = a.initial_income / a.initial_cost;
      const efficiencyB = b.initial_income / b.initial_cost;
      return efficiencyB - efficiencyA;
    }
  });
  
  // Обработчики действий с бизнесами
  const handleUpgradeBusiness = (business: Business) => {
    if (balance >= business.upgrade_cost) {
      // Улучшаем бизнес
      const updatedBusinesses = ownedBusinesses.map(b => {
        if (b.business_id === business.business_id) {
          return {
            ...b,
            level: b.level + 1,
            income_per_hour: Math.round(b.income_per_hour * 1.2), // +20% к доходу
            upgrade_cost: Math.round(b.upgrade_cost * 1.5) // +50% к стоимости улучшения
          };
        }
        return b;
      });
      
      setOwnedBusinesses(updatedBusinesses);
      setBalance(balance - business.upgrade_cost);
      setUpgradeModal({ visible: false });
    }
  };
  
  const handleBuyBusiness = (business: AvailableBusiness) => {
    if (balance >= business.initial_cost) {
      // Покупаем бизнес
      const newBusiness: Business = {
        business_id: business.id,
        owner_id: 'user1',
        name: business.name,
        type: business.type,
        level: 1,
        income_per_hour: business.initial_income,
        cost: business.initial_cost,
        upgrade_cost: Math.round(business.initial_cost * 0.6), // 60% от начальной стоимости
        purchased_at: new Date()
      };
      
      setOwnedBusinesses([...ownedBusinesses, newBusiness]);
      setAvailableBusinesses(availableBusinesses.filter(b => b.id !== business.id));
      setBalance(balance - business.initial_cost);
    }
  };
  
  return (
    <div className="business-page">
      <div className="business-page__header">
        <h1>Бизнесы</h1>
        <div className="business-page__balance">
          Баланс: <span>{balance}</span>
        </div>
      </div>
      
      <BusinessFilters 
        activeTab={activeTab}
        businessType={businessType}
        sortBy={sortBy}
        onChangeTab={setActiveTab}
        onChangeType={setBusinessType}
        onChangeSortBy={setSortBy}
      />
      
      <div className="business-page__content">
        {activeTab === 'owned' ? (
          <>
            {sortedOwnedBusinesses.length > 0 ? (
              <div className="business-page__list">
                {sortedOwnedBusinesses.map(business => (
                  <BusinessCard 
                    key={business.business_id} 
                    business={business} 
                    onClick={() => setUpgradeModal({ visible: true, business })}
                  />
                ))}
              </div>
            ) : (
              <div className="business-page__empty">
                <p>У вас пока нет бизнесов</p>
                <Button 
                  variant="accent" 
                  onClick={() => setActiveTab('available')}
                >
                  Просмотреть доступные бизнесы
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="business-page__list">
              {sortedAvailableBusinesses.map(business => (
                <AvailableBusinessCard 
                  key={business.id} 
                  business={business} 
                  onBuy={handleBuyBusiness}
                  canAfford={balance >= business.initial_cost}
                />
              ))}
            </div>
            
            {sortedAvailableBusinesses.length === 0 && (
              <div className="business-page__empty">
                <p>Нет доступных бизнесов для покупки</p>
              </div>
            )}
          </>
        )}
      </div>
      
      {upgradeModal.visible && upgradeModal.business && (
        <BusinessUpgradeModal 
          business={upgradeModal.business}
          onUpgrade={handleUpgradeBusiness}
          onClose={() => setUpgradeModal({ visible: false })}
          canAfford={balance >= upgradeModal.business.upgrade_cost}
        />
      )}
      
      <BottomNav />
    </div>
  );
};

export default BusinessPage; 