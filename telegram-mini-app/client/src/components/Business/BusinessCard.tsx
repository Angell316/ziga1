import React from 'react';
import './BusinessCard.scss';
import { Business } from '../../types/business';

interface BusinessCardProps {
  business: Business;
  onClick?: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onClick }) => {
  return (
    <div className="business-card" onClick={onClick}>
      <div className="business-card__header">
        <h3 className="business-card__title">{business.name}</h3>
        <span className="business-card__level">Уровень {business.level}</span>
      </div>
      <div className="business-card__content">
        <div className="business-card__income">
          <span className="business-card__income-label">Доход:</span>
          <span className="business-card__income-value">{business.income_per_hour}/час</span>
        </div>
        <div className="business-card__upgrade">
          <span className="business-card__upgrade-label">Улучшение:</span>
          <span className="business-card__upgrade-value">{business.upgrade_cost}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard; 