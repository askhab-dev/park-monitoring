import styles from './StatsRow.module.css';
import { useApi } from '@/shared/hooks/useApi';
import { StatItem } from '@/shared/ui/StatItem/StatItem';

type Stat = React.ComponentProps<typeof StatItem>;

type OverviewData = {
  total: number;
  working: number;
  lowSupply: number;
  needsRepair: number;
};

export const StatsRow = () => {
  const { data, error, isLoading } = useApi<OverviewData>('/machines/overview');

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
        <StatItem key={index} {...item} />
      ))}
    </div>
  );
};
