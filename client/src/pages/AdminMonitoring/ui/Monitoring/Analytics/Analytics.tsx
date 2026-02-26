import styles from './Analytics.module.css';
import { PopulatItems } from './PopulatItems/PopulatItems';
import { SalesVolumes } from './SalesVolumes/SalesVolumes';

export const Analytics = () => {
  return <>
    <h1 className={styles.title}>Аналитика продаж и потребительского поведения</h1>
    <div className={styles.containers}>
      <SalesVolumes />
      <PopulatItems />
    </div>
  </>;
};
