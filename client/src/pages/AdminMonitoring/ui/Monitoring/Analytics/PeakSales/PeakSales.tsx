import useSWR from 'swr'
import { MultiSwitcher } from '@/shared/ui/MultiSwitcher/MultiSwitcher';
import styles from './PeakSales.module.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type PeakSalesResponse = {
  day: number,
  peakSalesTime: string,
}[]

export const PeakSales = () => {
  const { data, error, isLoading } = useSWR<PeakSalesResponse>(
    'http://localhost:8080/sales/peak-sale-count-per-day',
    fetcher
  );

  if (error) return (
    <div className={styles.container}>
      <h2 className={styles.title}>Время пиковых продаж</h2>
      <div className={styles.message}>Ошибка загрузки данных</div>
    </div>
  )

  if (isLoading || !data) return (
    <div className={styles.container}>
      <h2 className={styles.title}>Время пиковых продаж</h2>
      <div className={styles.message}>Загрузка...</div>
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Время пиковых продаж</h2>
        <MultiSwitcher
          className={styles.switcher}
          items={[
            { id: 'linear', label: 'Линейный график' },
            { id: 'heatmap', label: 'Тепловая карта' },
          ]}
          defaultValue={'linear'}
        />

      </div>
    </div>
  )
};
