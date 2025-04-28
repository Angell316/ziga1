import React, { useState, useEffect } from 'react';
import './IncomeCounter.scss';

interface IncomeCounterProps {
  incomePerHour: number;
}

const IncomeCounter: React.FC<IncomeCounterProps> = ({ incomePerHour }) => {
  const [currentIncome, setCurrentIncome] = useState(0);
  const incomePerSecond = incomePerHour / 3600;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIncome(prev => {
        const newIncome = prev + incomePerSecond;
        return parseFloat(newIncome.toFixed(2));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [incomePerSecond]);

  return (
    <div className="income-counter">
      <div className="income-counter__title">Доход в реальном времени</div>
      <div className="income-counter__value">+{currentIncome.toFixed(2)}</div>
      <div className="income-counter__rate">{incomePerHour}/час</div>
    </div>
  );
};

export default IncomeCounter; 