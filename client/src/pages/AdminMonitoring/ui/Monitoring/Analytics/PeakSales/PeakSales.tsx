import useSWR from 'swr'
import { MultiSwitcher } from '@/shared/ui/MultiSwitcher/MultiSwitcher';
import styles from './PeakSales.module.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const fetcher = (url: string) => fetch(url).then(res => res.json());

type PeakSalesResponse = {
  day: number,
  peakSalesTime: string,
}[]

export const PeakSales = () => {
  const { data, error, isLoading } = useSWR<PeakSalesResponse>(
    'http://localhost:8080/sales/peak-sale-count-per-day',
    fetcher
  );

  if (error) return (
    <div className={styles.container}>
      <h2 className={styles.title}>Время пиковых продаж</h2>
      <div className={styles.message}>Ошибка загрузки данных</div>
    </div>
  )

  if (isLoading || !data) return (
    <div className={styles.container}>
      <h2 className={styles.title}>Время пиковых продаж</h2>
      <div className={styles.message}>Загрузка...</div>
    </div>
  )

  const chartData = data.map(item => {
    const [h, m] = item.peakSalesTime.split(':').map(Number)

    return {
      day: item.day,
      value: h + m / 60,
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Время пиковых продаж</h2>
        <MultiSwitcher
          className={styles.switcher}
          items={[
            { id: 'linear', label: 'Линейный график' },
            { id: 'heatmap', label: 'Тепловая карта' },
          ]}
          defaultValue={'linear'}
        />
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={204}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4B5563" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#4B5563" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#E5E7EB" vertical horizontal={false} />

            <XAxis
              dataKey="day"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 24]}
              width={120}
              ticks={[0, 6, 10, 12, 16, 20]}
              tickFormatter={(v) =>
                v === 0
                  ? '00:00 – 05:59'
                  : v === 6
                    ? '06:00 – 09:59'
                    : v === 10
                      ? '10:00 – 11:59'
                      : v === 12
                        ? '12:00 – 15:59'
                        : v === 16
                          ? '16:00 – 19:59'
                          : '20:00 – 23:59'
              }
              tick={{
                fill: '#6B7280',
                fontSize: 12,
                textAnchor: 'start',
                dx: -100,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => {
                const hours = Math.floor(Number(value))
                const minutes = Math.round((Number(value) - hours) * 60)
                return `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}`
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#4B5563"
              strokeWidth={3}
              fill="url(#peakGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
};
