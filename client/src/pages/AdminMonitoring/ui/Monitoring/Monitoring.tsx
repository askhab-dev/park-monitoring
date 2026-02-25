import styles from './Monitoring.module.css';
import { PeriodSwitcher } from './PeriodSwitcher/PeriodSwitcher';


export const Monitoring = () => {
  return (
    <div className={styles.monitoring}>
      <PeriodSwitcher />
    </div>
  );
};
