import { PeriodSwitcher } from './PeriodSwitcher/PeriodSwitcher';
import { StatsRow } from './StatsRow/StatsRow';
import { Map } from './Map/Map';

import styles from './Monitoring.module.css';

export const Monitoring = () => {
  return (
    <div className={styles.monitoring}>
      <PeriodSwitcher />
      <StatsRow />
      <Map />
    </div>
  );
};
