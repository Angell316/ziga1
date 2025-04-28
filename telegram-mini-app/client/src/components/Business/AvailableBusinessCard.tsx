import React from 'react';
import './AvailableBusinessCard.scss';
import { AvailableBusiness } from '../../types/business';
import Button from '../common/Button';

interface AvailableBusinessCardProps {
  business: AvailableBusiness;
  onBuy: (business: AvailableBusiness) => void;
  canAfford: boolean;
}

const AvailableBusinessCard: React.FC<AvailableBusinessCardProps> = ({ 
  business, 
  onBuy, 
  canAfford 
}) => {
  return (
    <div className="available-business-card">
      <div className="available-business-card__header">
        <h3 className="available-business-card__title">{business.name}</h3>
        <span className={`available-business-card__type ${business.type}`}>
          {business.type === 'legal' ? 'Легальный' : 'Даркнет'}
        </span>
      </div>
      
      <p className="available-business-card__description">{business.description}</p>
      
      <div className="available-business-card__details">
        <div className="available-business-card__detail">
          <span className="available-business-card__detail-label">Доход:</span>
          <span className="available-business-card__detail-value">{business.initial_income}/час</span>
        </div>
        <div className="available-business-card__detail">
          <span className="available-business-card__detail-label">Стоимость:</span>
          <span className="available-business-card__detail-value">{business.initial_cost}</span>
        </div>
        <div className="available-business-card__detail">
          <span className="available-business-card__detail-label">Окупаемость:</span>
          <span className="available-business-card__detail-value">
            {Math.ceil(business.initial_cost / business.initial_income)} ч
          </span>
        </div>
      </div>
      
      <div className="available-business-card__actions">
        <Button 
          variant="primary"
          size="medium"
          fullWidth
          onClick={() => onBuy(business)}
          disabled={!canAfford}
        >
          {canAfford ? 'Купить' : 'Недостаточно средств'}
        </Button>
      </div>
    </div>
  );
};

export default AvailableBusinessCard; 