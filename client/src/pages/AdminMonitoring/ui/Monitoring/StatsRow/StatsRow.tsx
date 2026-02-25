import ArrowIcon from '../../../assets/arrowRight.svg?react';
import styles from './StatsRow.module.css';

type StatStatus = 'good' | 'warning' | 'danger' | null;

type Stat = {
  label: string;
  value: number;
  percent?: string;
  status?: StatStatus;
  showArrow?: boolean;
};

const statsData: Stat[] = [
  {
    label: 'Всего автоматов',
    value: 78,
    showArrow: true,
  },
  {
    label: 'Работающих',
    value: 76,
    percent: '98%',
    status: 'good',
    showArrow: true,
  },
  {
    label: 'Мало товаров',
    value: 16,
    percent: '12%',
    status: 'warning',
    showArrow: true,
  },
  {
    label: 'Требуют обслуживания',
    value: 2,
    percent: '1%',
    status: 'danger',
    showArrow: false,
  },
];

export const StatsRow = () => {
  return (
    <div className={styles.statsRow}>
      {statsData.map((item, index) => (
        <div key={index} className={styles.statItem}>
          <div className={styles.label}>
            <span>{item.label}</span>
            {item.showArrow && <ArrowIcon className={styles.arrow} />}
          </div>

          <div className={styles.valueWrapper}>
            <span
              className={
                item.status
                  ? `${styles.value} ${styles[item.status]}`
                  : styles.value
              }
            >
              {item.value}
            </span>

            {item.percent && (
              <span
                className={styles.percent}
              >
                {item.percent}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
