import styles from './SalesIndex.module.css';
import { useApi } from '@/shared/hooks/useApi';
import ArrowDownIcon from '@/shared/assets/arrow-down-wide.svg?react';
import { ReportButton } from '@/shared/ui/ReportButton/ReportButton';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorMessage } from '@/shared/ui/Error/Error';

interface MachineData {
  machineId: number;
  machineType: string;
  percentage: number;
}

export const SalesIndex = () => {
  const { data, error, isLoading } = useApi<MachineData[]>(
    '/sales/index-by-historic-avg',
  );

  if (error)
    return (
      <div className={styles.error}>
        <ErrorMessage />
      </div>
    );
  if (isLoading)
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  const items = (data ?? [])
    .slice()
    .sort((a, b) => a.percentage - b.percentage);

  const typeColor = (type: string) => {
    switch (type) {
      case 'B':
        return '#F04438'; // red
      case 'M':
        return '#F79009'; // orange
      case 'A':
        return '#17B26A'; // green
      default:
        return '#6b7280'; // gray
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Индекс продаж по средней исторической активности
      </h2>

      <div className={styles.toolbar}>
        <button className={styles.ghostButton}>Изменить показатель</button>
        <button>
          <ArrowDownIcon />
        </button>
      </div>

      <ul className={styles.list}>
        {items.map((it) => (
          <li key={it.machineId} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.left}>
                <div
                  className={styles.badge}
                  style={{ color: typeColor(it.machineType) }}
                  aria-hidden
                >
                  {it.machineType}
                </div>
                <div className={styles.machineId}>
                  <span className={styles.hash}>#</span> {it.machineId}
                </div>
              </div>
              <span className={styles.percentLabel}>{it.percentage} %</span>
            </div>
            <div className={styles.itemLine}>
              <div
                className={styles.line}
                style={{
                  width: `${it.percentage}%`,
                  backgroundColor: typeColor(it.machineType),
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <ReportButton />
    </div>
  );
};
