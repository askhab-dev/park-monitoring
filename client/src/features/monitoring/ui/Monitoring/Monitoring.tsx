import { lazy, Suspense } from 'react';
import { PeriodSwitcher } from './PeriodSwitcher/PeriodSwitcher';
import { StatsRow } from './StatsRow/StatsRow';
import { Map } from './Map/Map';
import { VMParamsSwitcher } from './VMParamsSwitcher/VMParamsSwitcher';

import styles from './Monitoring.module.css';
import { StatsReview } from './StatsReview/StatsReview';
import { Loader } from '@/shared/ui/Loader/Loader';

const AnalyticsSection = lazy(() =>
  import('./Analytics/Analytics').then((m) => ({ default: m.Analytics })),
);

export const Monitoring = () => {
  return (
    <div className={styles.monitoring}>
      <PeriodSwitcher />
      <StatsRow />
      <Map>
        <VMParamsSwitcher />
      </Map>
      <StatsReview />
      <Suspense fallback={<Loader />}>
        <AnalyticsSection />
      </Suspense>
    </div>
  );
};
