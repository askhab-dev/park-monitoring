import cx from 'clsx';
import styles from './SalesVolumes.module.css';
import { useApi } from '@/shared/hooks/useApi';
import { ReportButton } from '@/shared/ui/ReportButton/ReportButton';
import Coin1Icon from '@/shared/assets/coin1.svg?react';
import Coin2Icon from '@/shared/assets/coin2.svg?react';
import Coin3Icon from '@/shared/assets/coin3.svg?react';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorMessage } from '@/shared/ui/Error/Error';

type SalesResponse = {
  totalSales: number;
  soldInTopFive: number;
  topVendingMachines: {
    totalSales: number;
    percentageOfAllSales: number;
  }[];
};

export const SalesVolumes = () => {
  const { data, error, isLoading } = useApi<SalesResponse>(
    '/sales/by-vending-machine',
  );

  if (error)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>ТА по объемам продаж</h2>
        <ErrorMessage className={styles.message} />
      </div>
    );

  if (isLoading || !data)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>ТА по объемам продаж</h2>
        <Loader className={styles.message} />
      </div>
    );

  const { totalSales, soldInTopFive, topVendingMachines } = data;

  const totalPercentage = topVendingMachines.reduce(
    (sum, item) => sum + item.percentageOfAllSales,
    0,
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ТА по объемам продаж</h2>

      <div className={styles.columns}>
        {topVendingMachines.map((it, idx) => {
          const fillClass = styles.barFillLow;

          return (
            <div key={idx} className={styles.barColumn}>
              <div className={styles.barBackground}>
                <div className={styles.barPercent}>
                  {it.percentageOfAllSales}%
                </div>
                <div
                  className={cx(styles.barFill, fillClass)}
                  style={{ height: `${it.percentageOfAllSales}%` }}
                >
                  {idx === 0 && <Coin1Icon />}
                  {idx === 1 && <Coin2Icon />}
                  {idx === 2 && <Coin3Icon />}
                </div>
              </div>
            </div>
          );
        })}
        <div className={styles.barColumn}>
          <div className={styles.barBackground}>
            <div className={styles.barPercent}>{totalPercentage}%</div>
            <div
              className={cx(styles.barFill, styles.barFillGrey)}
              style={{ height: `${totalPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.cardTotal}>{totalSales}</div>
          </div>
          <div className={styles.cardSubtitle}>
            Всего
            <br />
            проданных единиц
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.cardTotal}>{soldInTopFive}</div>
            <div className={styles.percentBadge}>
              {100 - Math.round((soldInTopFive / totalSales) * 100)}%
            </div>
          </div>
          <div className={styles.cardSubtitle}>
            Итого продано
            <br />в топ-5 ТА
          </div>
        </div>
      </div>
      <ReportButton />
    </div>
  );
};
