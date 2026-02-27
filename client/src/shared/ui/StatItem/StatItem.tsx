import React from 'react';
import cx from 'clsx';
import styles from './StatItem.module.css';
import ArrowIcon from '@/shared/assets/arrowRight.svg?react';

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
    <a className={styles.statItem} href='#'>
      <div className={styles.label}>
        <span>{label}</span>
        {showArrow && <ArrowIcon className={styles.arrow} />}
      </div>

      <div className={styles.valueWrapper}>
        <span className={cx(styles.value, status && styles[status])}>
          {value}
        </span>

        {percent && <span className={styles.percent}>{percent}</span>}
      </div>
    </a>
  );
};
