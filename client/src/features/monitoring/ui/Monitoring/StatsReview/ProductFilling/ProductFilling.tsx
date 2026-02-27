import { useApi } from '@/shared/hooks/useApi';
import styles from './ProductFilling.module.css';
import { ReportButton } from '@/shared/ui/ReportButton/ReportButton';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorMessage } from '@/shared/ui/Error/Error';

type FillItem = {
  itemCount: number
  fillPercentage: number
}

type ProductFillResponse = {
  total: number
  topFilled: FillItem[]
}

export const ProductFilling = () => {
  const { data, error, isLoading } = useApi<ProductFillResponse>('/machines/product-fill');

  if (error)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Заполнение товарами</h2>
        <ErrorMessage className={styles.message} />
        <ReportButton />
      </div>
    );

  if (isLoading || !data)
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Заполнение товарами</h2>
        <Loader className={styles.message} />
        <ReportButton />
      </div>
    );

  const { topFilled, total } = data

  const sortedAsc = [...topFilled].sort((a, b) => a.fillPercentage - b.fillPercentage)
  const lowSelected = sortedAsc.slice(0, Math.min(2, sortedAsc.length))
  const cardTotal = lowSelected.reduce((s, it) => s + it.itemCount, 0)
  const percentOfTotal = total > 0 ? Math.round((cardTotal / total) * 100) : 0

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Заполнение товарами</h2>

      <div className={styles.barsWrapper}>
        {[...topFilled].reverse().map((it, idx) => {
          const isLow = idx > 2;
          const fillClass = isLow ? styles.barFillLow : styles.barFillGrey

          return (
            <div key={idx} className={styles.barColumn}>
              <div className={styles.barBackground}>
                {isLow && <div className={styles.barPercent}>{it.fillPercentage}%</div>}
                <div
                  className={`${styles.barFill} ${fillClass}`}
                  style={{ height: `${100-it.fillPercentage}px` }}
                >
                {isLow && <div className={styles.barCount}>{it.itemCount}</div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardTotal}>{cardTotal}</div>
          <div className={styles.percentBadge}>{percentOfTotal}%</div>
        </div>
        <div className={styles.cardSubtitle}>ТА требуют пополнения товаром</div>
      </div>
      <div className={styles.space}/>
      <ReportButton className={styles.footer} />
    </div>
  );
};
