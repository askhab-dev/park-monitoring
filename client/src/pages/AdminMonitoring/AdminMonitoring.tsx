import { Header } from "@/widgets/Header"
import { LeftMenu } from '@/widgets/LeftMenu/LeftMenu'
import { InnerMenu } from './ui/InnerMenu/InnerMenu'

import styles from './AdminMonitoring.module.css';
import { Monitoring } from './ui/Monitoring/Monitoring';

export const AdminMonitoring: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <LeftMenu />
        <InnerMenu />
        <Monitoring />
      </main>
    </>
  )
};
