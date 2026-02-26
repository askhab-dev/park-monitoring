import useSWR from 'swr'
import styles from './SalesIndex.module.css'
import ArrowDownIcon from '../../../../assets/arrow-down-wide.svg?react'
import { ReportButton } from '@/shared/ui/ReportButton/ReportButton'

interface MachineData {
  machineId: number
  machineType: string
  percentage: number
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const SalesIndex = () => {
  const { data, error, isLoading } = useSWR<MachineData[]>(
    'http://localhost:8080/sales/index-by-historic-avg',
    fetcher
  )

  if (error) return <div className={styles.error}>Ошибка загрузки данных</div>
  if (isLoading) return <div className={styles.loading}>Загрузка...</div>
  const items = (data ?? []).slice().sort((a, b) => a.percentage - b.percentage)

  const typeColor = (type: string) => {
    switch (type) {
      case 'B':
        return '#F04438' // red
      case 'M':
        return '#F79009' // orange
      case 'A':
        return '#17B26A' // green
      default:
        return '#6b7280' // gray
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Индекс продаж по средней исторической активности</h2>

      <div className={styles.toolbar}>
        <button className={styles.ghostButton}>Изменить показатель</button>
        <button><ArrowDownIcon /></button>
      </div>

      <ul className={styles.list}>
        {items.map((it) => (
          <li key={it.machineId} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.left}>
                <div
                  className={styles.badge}
                  style={{ color: typeColor(it.machineType) }}
                  aria-hidden
                >
                  {it.machineType}
                </div>
                <div className={styles.machineId}><span className={styles.hash}>#</span> {it.machineId}</div>
              </div>
              <span className={styles.percentLabel}>{it.percentage} %</span>
            </div>
            <div className={styles.itemLine}>
              <div
                className={styles.line}
                style={{ width: `${it.percentage}%`, backgroundColor: typeColor(it.machineType) }}
              />
            </div>
          </li>
        ))}
      </ul>

      <ReportButton/>
    </div>
  )
};
