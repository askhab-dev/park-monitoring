import { PeriodSwitcher } from './PeriodSwitcher/PeriodSwitcher';
import { StatsRow } from './StatsRow/StatsRow';
import { Map } from './Map/Map';

import styles from './Monitoring.module.css';
import { MultiSwitcher } from '@/shared/ui/MultiSwitcher/MultiSwitcher';
import { useState } from 'react';

type VMParam = 'state' | 'revenue' | 'downtime' | 'fillLevel';

const VMParams: { id: VMParam; label: string }[] = [
  { id: 'state', label: 'Состояние автоматов' },
  { id: 'revenue', label: 'Средняя выручка' },
  { id: 'downtime', label: 'Простой ТА' },
  { id: 'fillLevel', label: 'Уровень заполнения' },
];


export const Monitoring = () => {
    const [active, setActive] = useState<VMParam>('state');
  
  return (
    <div className={styles.monitoring}>
      <PeriodSwitcher />
      <StatsRow />
      <Map />
      <MultiSwitcher
        className={styles.vmSwitcher}
        items={VMParams}
        value={active}
        onChange={setActive}
      />
    </div>
  );
};
