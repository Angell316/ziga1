import React from 'react';
import './BusinessFilters.scss';
import { BusinessType } from '../../types/business';

interface BusinessFiltersProps {
  activeTab: 'owned' | 'available';
  businessType: BusinessType | 'all';
  sortBy: 'income' | 'cost' | 'efficiency';
  onChangeTab: (tab: 'owned' | 'available') => void;
  onChangeType: (type: BusinessType | 'all') => void;
  onChangeSortBy: (sortBy: 'income' | 'cost' | 'efficiency') => void;
}

const BusinessFilters: React.FC<BusinessFiltersProps> = ({
  activeTab,
  businessType,
  sortBy,
  onChangeTab,
  onChangeType,
  onChangeSortBy
}) => {
  return (
    <div className="business-filters">
      <div className="business-filters__tabs">
        <button 
          className={`business-filters__tab ${activeTab === 'owned' ? 'active' : ''}`}
          onClick={() => onChangeTab('owned')}
        >
          Мои бизнесы
        </button>
        <button 
          className={`business-filters__tab ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => onChangeTab('available')}
        >
          Доступные
        </button>
      </div>
      
      <div className="business-filters__options">
        <div className="business-filters__group">
          <label className="business-filters__label">Тип:</label>
          <div className="business-filters__buttons">
            <button 
              className={`business-filters__button ${businessType === 'all' ? 'active' : ''}`}
              onClick={() => onChangeType('all')}
            >
              Все
            </button>
            <button 
              className={`business-filters__button ${businessType === 'legal' ? 'active' : ''}`}
              onClick={() => onChangeType('legal')}
            >
              Легальные
            </button>
            <button 
              className={`business-filters__button ${businessType === 'darknet' ? 'active' : ''}`}
              onClick={() => onChangeType('darknet')}
            >
              Даркнет
            </button>
          </div>
        </div>
        
        <div className="business-filters__group">
          <label className="business-filters__label">Сортировка:</label>
          <div className="business-filters__buttons">
            <button 
              className={`business-filters__button ${sortBy === 'income' ? 'active' : ''}`}
              onClick={() => onChangeSortBy('income')}
            >
              По доходу
            </button>
            <button 
              className={`business-filters__button ${sortBy === 'cost' ? 'active' : ''}`}
              onClick={() => onChangeSortBy('cost')}
            >
              По цене
            </button>
            <button 
              className={`business-filters__button ${sortBy === 'efficiency' ? 'active' : ''}`}
              onClick={() => onChangeSortBy('efficiency')}
            >
              По эффективности
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessFilters; 