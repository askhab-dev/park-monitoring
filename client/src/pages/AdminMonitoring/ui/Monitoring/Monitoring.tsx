import styles from './Monitoring.module.css';
import { PeriodSwitcher } from './PeriodSwitcher/PeriodSwitcher';
import { StatsRow } from './StatsRow/StatsRow';

export const Monitoring = () => {
  return (
    <div className={styles.monitoring}>
      <PeriodSwitcher />
      <StatsRow />
    </div>
  );
};
