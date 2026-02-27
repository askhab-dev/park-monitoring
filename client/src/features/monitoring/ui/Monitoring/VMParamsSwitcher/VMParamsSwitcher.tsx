import { useState } from 'react';
import styles from './VMParamsSwitcher.module.css';
import { MultiSwitcher } from '@/shared/ui/MultiSwitcher/MultiSwitcher';

type VMParam = 'state' | 'revenue' | 'downtime' | 'fillLevel';

const VMParams: { id: VMParam; label: string }[] = [
  { id: 'state', label: 'Состояние автоматов' },
  { id: 'revenue', label: 'Средняя выручка' },
  { id: 'downtime', label: 'Простой ТА' },
  { id: 'fillLevel', label: 'Уровень заполнения' },
];

export const VMParamsSwitcher = () => {
  const [active, setActive] = useState<VMParam>('state');

  return (
    <MultiSwitcher
      className={styles.vmSwitcher}
      items={VMParams}
      value={active}
      onChange={setActive}
    />
  );
};
