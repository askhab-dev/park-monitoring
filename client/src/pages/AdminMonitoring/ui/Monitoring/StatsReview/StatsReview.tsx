import { SalesIndex } from './SalesIndex/SalesIndex';
import styles from './StatsReview.module.css';

export const StatsReview = () => {
  return (
    <>
      <h1 className={styles.statsReviewTitle}>
        Обзор состояния ТА
      </h1>
      <div>
        <SalesIndex />
      </div>
    </>
  );
};
