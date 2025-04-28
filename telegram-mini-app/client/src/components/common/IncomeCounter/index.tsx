import React, { useState, useEffect } from 'react';
import './IncomeCounter.scss';

interface IncomeCounterProps {
  incomePerHour: number;
}

const IncomeCounter: React.FC<IncomeCounterProps> = ({ incomePerHour }) => {
  const [accumulatedIncome, setAccumulatedIncome] = useState(0);
  // Рассчитываем доход в секунду
  const incomePerSecond = incomePerHour / 3600;
  // Форматируем доход в секунду для отображения (округляем до 2 знаков)
  const displayIncomePerSecond = incomePerSecond.toFixed(2);

  useEffect(() => {
    // Обновляем накопленный доход каждую секунду
    const interval = setInterval(() => {
      setAccumulatedIncome(prev => {
        const newIncome = prev + incomePerSecond;
        return parseFloat(newIncome.toFixed(2));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [incomePerSecond]);

  return (
    <div className="income-counter">
      <div className="income-counter__title">Доход в реальном времени</div>
      <div className="income-counter__value">+{displayIncomePerSecond}</div>
      <div className="income-counter__accumulated">
        {incomePerHour} монет в час
      </div>
    </div>
  );
};

export default IncomeCounter; 