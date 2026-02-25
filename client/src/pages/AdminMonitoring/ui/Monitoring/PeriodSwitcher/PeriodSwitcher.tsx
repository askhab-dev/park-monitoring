import { useState } from 'react';
import styles from './PeriodSwitcher.module.css';

type Period = 'today' | 'yesterday' | 'week' | 'month' | 'quarter' | 'custom';

const periods: { id: Period; label: string }[] = [
  { id: 'today', label: 'Сегодня' },
  { id: 'yesterday', label: 'Вчера' },
  { id: 'week', label: 'Неделя' },
  { id: 'month', label: 'Месяц' },
  { id: 'quarter', label: 'Квартал' },
  { id: 'custom', label: '23.08.2023 – 20.09.2024' },
];

export const PeriodSwitcher = () => {
  const [active, setActive] = useState<Period>('month');

  return (
    <div className={styles.container}>
      {periods.map((period) => (
        <button
          key={period.id}
          className={`${styles.item} ${active === period.id ? styles.active : ''}`}
          onClick={() => setActive(period.id)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};
