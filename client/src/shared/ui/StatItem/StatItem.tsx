import React from 'react';
import ArrowIcon from '@/shared/assets/arrowRight.svg?react';
import styles from './StatItem.module.css';

type StatStatus = 'good' | 'warning' | 'danger' | null;

interface StatItemProps {
  label: string;
  value: number;
  percent?: string;
  status?: StatStatus;
  showArrow?: boolean;
}

export const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  percent,
  status,
  showArrow,
}) => {
  return (
    <div className={styles.statItem}>
      <div className={styles.label}>
        <span>{label}</span>
        {showArrow && <ArrowIcon className={styles.arrow} />}
      </div>

      <div className={styles.valueWrapper}>
        <span
          className={
            status ? `${styles.value} ${styles[status]}` : styles.value
          }
        >
          {value}
        </span>

        {percent && <span className={styles.percent}>{percent}</span>}
      </div>
    </div>
  );
};
