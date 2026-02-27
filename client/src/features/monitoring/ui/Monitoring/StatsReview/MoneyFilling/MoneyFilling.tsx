import { useApi } from '@/shared/hooks/useApi';
import ArrowDownIcon from '@/shared/assets/arrow-down-narrow.svg?react';
import CoinIcon from '@/shared/assets/coin.svg?react';
import CashIcon from '@/shared/assets/cash.svg?react';
import styles from './MoneyFilling.module.css';
import { ReportButton } from '@/shared/ui/ReportButton/ReportButton';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorMessage } from '@/shared/ui/Error/Error';

const typeColor = (type: string) => {
  switch (type) {
    case 'B':
      return '#F04438' // red
    case 'M':
      return '#F79009' // orange
    case 'A':
      return '#17B26A' // green
    default:
      return '#6b7280' // gray
  }
};

type MoneyFillResponse = {
  machineId: number
  machineType: string
  coinFillPercentage: number
  banknotesFillPercentage: number
}[];

export const MoneyFilling = () => {
  const { data, error, isLoading } = useApi<MoneyFillResponse>('/machines/money-fill');

  if (error)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Состояние денежных средств</h2>
        <ErrorMessage className={styles.message} />
        <ReportButton />
      </div>
    );

  if (isLoading || !data)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Состояние денежных средств</h2>
        <Loader className={styles.message} />
        <ReportButton />
      </div>
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Состояние денежных средств</h2>
      <button className={styles.ghostButton}>
        <ArrowDownIcon />
        <span>Сначала полные ТА</span>
      </button>
      <div className={styles.content}>
        {data.map((it) => (
          <div className={styles.item} key={it.machineId}>
            <div className={styles.left}>
              <div
                className={styles.badge}
                style={{ color: typeColor(it.machineType) }}
                aria-hidden
              >
                {it.machineType}
              </div>
              <div className={styles.machineId}><span className={styles.hash}>#</span> {it.machineId}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.fillWrapper}>
                <div className={styles.percentage}>
                  <CoinIcon />
                  <span>{it.coinFillPercentage}%</span>
                </div>
                <div className={styles.itemLine}>
                  <div
                    className={styles.line}
                    style={{ width: `${it.coinFillPercentage}%`, backgroundColor: typeColor(it.machineType) }}
                  />
                </div>

              </div>
              <div className={styles.fillWrapper}>
                <div className={styles.percentage}>
                  <CashIcon />
                  <span>{it.banknotesFillPercentage}%</span>
                </div>
                <div className={styles.itemLine}>
                  <div
                    className={styles.line}
                    style={{ width: `${it.banknotesFillPercentage}%`, backgroundColor: typeColor(it.machineType) }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReportButton />
    </div>
  );
};
