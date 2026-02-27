import styles from './StatsRow.module.css';
import { useApi } from '@/shared/hooks/useApi';
import { StatItem } from '@/shared/ui/StatItem/StatItem';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorMessage } from '@/shared/ui/Error/Error';

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
    return (
      <div className={styles.statsRow}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.statsRow}>
        <ErrorMessage />
      </div>
    );
  }

  if (!data) {
    return <div className={styles.statsRow}>Нет данных</div>;
  }

  const total = data.total || 0;
  const getPercent = (value: number) =>
    total > 0 ? `${Math.round((value / total) * 100)}%` : '0%';

  const statsData: Stat[] = [
    {
      label: 'Всего автоматов',
      value: total,
      showArrow: true,
    },
    {
      label: 'Работающих',
      value: data.working,
      percent: getPercent(data.working),
      status: 'good',
      showArrow: true,
    },
    {
      label: 'Мало товаров',
      value: data.lowSupply,
      percent: getPercent(data.lowSupply),
      status: 'warning',
      showArrow: true,
    },
    {
      label: 'Требуют обслуживания',
      value: data.needsRepair,
      percent: getPercent(data.needsRepair),
      status: 'danger',
      showArrow: false,
    },
  ];

  return (
    <div className={styles.statsRow}>
      {statsData.map((item) => (
        <StatItem key={item.label} {...item} />
      ))}
    </div>
  );
};
