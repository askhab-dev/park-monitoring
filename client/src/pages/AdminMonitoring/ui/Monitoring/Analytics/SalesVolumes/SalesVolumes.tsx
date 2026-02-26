import useSWR from 'swr'
import styles from './SalesVolumes.module.css';
import { ReportButton } from '@/shared/ui/ReportButton/ReportButton';
import Coin1Icon from '../../../../assets/coin1.svg?react'
import Coin2Icon from '../../../../assets/coin2.svg?react'
import Coin3Icon from '../../../../assets/coin3.svg?react'

const fetcher = (url: string) => fetch(url).then(res => res.json());

type SalesResponse = {
  totalSales: number;
  soldInTopFive: number;
  topVendingMachines: {
    totalSales: number;
    percentageOfAllSales: number;
  }[]
}

export const SalesVolumes = () => {
  const { data, error, isLoading } = useSWR<SalesResponse>(
    'http://localhost:8080/sales/by-vending-machine',
    fetcher
  );

  if (error) return (
    <div className={styles.container}>
      <h2 className={styles.title}>ТА по объемам продаж</h2>
      <div className={styles.message}>Ошибка загрузки данных</div>
      <ReportButton />
    </div>
  )

  if (isLoading || !data) return (
    <div className={styles.container}>
      <h2 className={styles.title}>ТА по объемам продаж</h2>
      <div className={styles.message}>Загрузка...</div>
      <ReportButton />
    </div>
  )

  const { totalSales, soldInTopFive, topVendingMachines } = data;

  const totalPercentage = topVendingMachines.reduce(
    (sum, item) => sum + item.percentageOfAllSales,
    0
  );

  return <div className={styles.container}>
    <h2 className={styles.title}>ТА по объемам продаж</h2>

    <div className={styles.columns}>
      {topVendingMachines.map((it, idx) => {
        const fillClass = styles.barFillLow;

        return (
          <div key={idx} className={styles.barColumn}>
            <div className={styles.barBackground}>
              <div className={styles.barPercent}>{it.percentageOfAllSales}%</div>
              <div
                className={`${styles.barFill} ${fillClass}`}
                style={{ height: `${it.percentageOfAllSales}%` }}
              >
                {idx === 0 && <Coin1Icon />}
                {idx === 1 && <Coin2Icon />}
                {idx === 2 && <Coin3Icon />}
              </div>
            </div>
          </div>
        )
      })}
      <div className={styles.barColumn}>
        <div className={styles.barBackground}>
          <div className={styles.barPercent}>{totalPercentage}%</div>
          <div
            className={`${styles.barFill} ${styles.barFillGrey}`}
            style={{ height: `${totalPercentage}%` }}
          >
          </div>
        </div>
      </div>
    </div>

    <div className={styles.statsContainer}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardTotal}>{totalSales}</div>
        </div>
        <div className={styles.cardSubtitle}>Всего<br />проданных единиц</div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardTotal}>{soldInTopFive}</div>
          <div className={styles.percentBadge}>{100 - Math.round((soldInTopFive / totalSales) * 100)}%</div>
        </div>
        <div className={styles.cardSubtitle}>Итого продано<br />в топ-5 ТА</div>
      </div>
    </div>
    <ReportButton />
  </div>
};
