import { useApi } from '@/shared/hooks/useApi';
import { ReportButton } from '@/shared/ui/ReportButton/ReportButton';
import Coin1Icon from '@/shared/assets/coin1.svg?react'
import Coin2Icon from '@/shared/assets/coin2.svg?react'
import Coin3Icon from '@/shared/assets/coin3.svg?react'
import { MultiSwitcher } from '@/shared/ui/MultiSwitcher/MultiSwitcher';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorMessage } from '@/shared/ui/Error/Error';

import styles from './PopulatItems.module.css';

type SalesByProductResponse = {
  totalSold: number;
  soldInTopFive: number;
  differentProductCategoriesCount: number;
  topProducts: {
    productId: number,
    category: number,
    soldTotal: number,
    percentageOfAllSales: number
  }[];
}

export const PopulatItems = () => {
  const { data, error, isLoading } = useApi<SalesByProductResponse>('/sales/by-product-type');

  if (error)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Популярные</h2>
        <ErrorMessage className={styles.message} />
        <ReportButton />
      </div>
    );

  if (isLoading || !data)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Популярные</h2>
        <Loader className={styles.message} />
        <ReportButton />
      </div>
    );

  const { totalSold, soldInTopFive, differentProductCategoriesCount, topProducts } = data;

  const totalPercentage = 100 - topProducts.reduce(
    (sum, item) => sum + item.percentageOfAllSales,
    0
  );

  return <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>Популярные</h2>
      <MultiSwitcher
        items={[
          { label: 'Товары', id: 'products' },
          { label: 'Категории', id: 'categories' },
        ]}
        defaultValue={'products'}
        className={styles.switcher}
      />
    </div>
    <div className={styles.columns}>
      {topProducts.map((it, idx) => {
        const fillClass = styles.barFillLow;

        return (
          <div key={idx} className={styles.barColumn}>
            <div className={styles.barBackground}>
              <div className={styles.barPercent}>{it.percentageOfAllSales}%</div>
              <div
                className={`${styles.barFill} ${fillClass}`}
                style={{ height: `${50 - it.percentageOfAllSales}%` }}
              >
                {idx === 0 && <Coin1Icon />}
                {idx === 1 && <Coin2Icon />}
                {idx === 2 && <Coin3Icon />}
                <div className={styles.barCount}>{it.soldTotal}</div>
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
          <div className={styles.cardTotal}>{differentProductCategoriesCount}</div>
        </div>
        <div className={styles.cardSubtitle}>Категории товаров<br />из Топ-5 </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardTotal}>{soldInTopFive}</div>
          <div className={styles.percentBadge}>{100 - Math.round((soldInTopFive / totalSold) * 100)}%</div>
        </div>
        <div className={styles.cardSubtitle}><br />Итого продано в топ-5 товаров</div>
      </div>
    </div>
    <ReportButton />
  </div>
};
