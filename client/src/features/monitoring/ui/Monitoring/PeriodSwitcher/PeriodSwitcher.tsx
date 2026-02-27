import { useState } from 'react';
import { MultiSwitcher } from '@/shared/ui/MultiSwitcher/MultiSwitcher';

type Period = 'today' | 'yesterday' | 'week' | 'month' | 'quarter' | 'custom';

const periods: { id: Period; label: string }[] = [
  { id: 'today', label: 'Сегодня' },
  { id: 'yesterday', label: 'Вчера' },
  { id: 'week', label: 'Неделя' },
  { id: 'month', label: 'Месяц' },
  { id: 'quarter', label: 'Квартал' },
  { id: 'custom', label: '23.08.2023 – 20.09.2024' },
];

export const PeriodSwitcher = () => {
  const [active, setActive] = useState<Period>('month');

  return <MultiSwitcher items={periods} value={active} onChange={setActive} />;
};
