import React from 'react';
import './BusinessUpgradeModal.scss';
import { Business } from '../../types/business';
import Button from '../common/Button';

interface BusinessUpgradeModalProps {
  business: Business;
  onUpgrade: (business: Business) => void;
  onClose: () => void;
  canAfford: boolean;
}

const BusinessUpgradeModal: React.FC<BusinessUpgradeModalProps> = ({
  business,
  onUpgrade,
  onClose,
  canAfford
}) => {
  // Расчет выгоды от улучшения (примерно +20% к доходу)
  const estimatedIncomeIncrease = Math.round(business.income_per_hour * 0.2);
  const newIncome = business.income_per_hour + estimatedIncomeIncrease;
  
  // Расчет окупаемости улучшения
  const upgradePaybackHours = Math.ceil(business.upgrade_cost / estimatedIncomeIncrease);
  
  return (
    <div className="business-upgrade-modal">
      <div className="business-upgrade-modal__overlay" onClick={onClose}></div>
      <div className="business-upgrade-modal__content">
        <div className="business-upgrade-modal__header">
          <h3>Улучшить бизнес</h3>
          <button className="business-upgrade-modal__close" onClick={onClose}>×</button>
        </div>
        
        <div className="business-upgrade-modal__body">
          <div className="business-upgrade-modal__business-info">
            <h4>{business.name}</h4>
            <div className="business-upgrade-modal__level">
              Текущий уровень: <span>{business.level}</span>
            </div>
          </div>
          
          <div className="business-upgrade-modal__upgrade-info">
            <div className="business-upgrade-modal__upgrade-item">
              <span className="business-upgrade-modal__upgrade-label">Стоимость улучшения:</span>
              <span className="business-upgrade-modal__upgrade-value">{business.upgrade_cost}</span>
            </div>
            
            <div className="business-upgrade-modal__upgrade-item">
              <span className="business-upgrade-modal__upgrade-label">Текущий доход:</span>
              <span className="business-upgrade-modal__upgrade-value">{business.income_per_hour}/час</span>
            </div>
            
            <div className="business-upgrade-modal__upgrade-item">
              <span className="business-upgrade-modal__upgrade-label">Новый доход:</span>
              <span className="business-upgrade-modal__upgrade-value business-upgrade-modal__upgrade-value--increased">
                {newIncome}/час <small>(+{estimatedIncomeIncrease})</small>
              </span>
            </div>
            
            <div className="business-upgrade-modal__upgrade-item">
              <span className="business-upgrade-modal__upgrade-label">Окупаемость:</span>
              <span className="business-upgrade-modal__upgrade-value">{upgradePaybackHours} ч</span>
            </div>
          </div>
        </div>
        
        <div className="business-upgrade-modal__footer">
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onUpgrade(business)}
            disabled={!canAfford}
          >
            {canAfford ? 'Улучшить' : 'Недостаточно средств'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessUpgradeModal; 