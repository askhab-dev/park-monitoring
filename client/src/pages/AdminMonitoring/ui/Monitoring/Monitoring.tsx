import { PeriodSwitcher } from './PeriodSwitcher/PeriodSwitcher';
import { StatsRow } from './StatsRow/StatsRow';
import { Map } from './Map/Map';
import { VMParamsSwitcher } from './VMParamsSwitcher/VMParamsSwitcher';

import styles from './Monitoring.module.css';
import { StatsReview } from './StatsReview/StatsReview';


export const Monitoring = () => {
  return (
    <div className={styles.monitoring}>
      <PeriodSwitcher />
      <StatsRow />
      <Map>
        <VMParamsSwitcher />
      </Map>
      <StatsReview />
    </div>
  );
};
