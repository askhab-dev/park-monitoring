import ArrowIcon from '../../../assets/arrowRight.svg?react';
import styles from './StatsRow.module.css';
import useSWR from 'swr';

type StatStatus = 'good' | 'warning' | 'danger' | null;

type Stat = {
  label: string;
  value: number;
  percent?: string;
  status?: StatStatus;
  showArrow?: boolean;
};

type OverviewData = {
  total: number;
  working: number;
  lowSupply: number;
  needsRepair: number;
};

const fetcher = (url: string) => fetch(`http://localhost:8080${url}`).then(res => res.json());

export const StatsRow = () => {
  const { data, error, isLoading } = useSWR<OverviewData>('/machines/overview', fetcher);

  if (isLoading) {
    return <div className={styles.statsRow}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.statsRow}>Ошибка: {error.message}</div>;
  }

  if (!data) {
    return <div className={styles.statsRow}>Нет данных</div>;
  }

  const total = data.total || 0;

  const statsData: Stat[] = [
    {
      label: 'Всего автоматов',
      value: total,
      showArrow: true,
    },
    {
      label: 'Работающих',
      value: data.working,
      percent: `${Math.round((data.working / total) * 100)}%`,
      status: 'good',
      showArrow: true,
    },
    {
      label: 'Мало товаров',
      value: data.lowSupply,
      percent: `${Math.round((data.lowSupply / total) * 100)}%`,
      status: 'warning',
      showArrow: true,
    },
    {
      label: 'Требуют обслуживания',
      value: data.needsRepair,
      percent: `${Math.round((data.needsRepair / total) * 100)}%`,
      status: 'danger',
      showArrow: false,
    },
  ];

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
