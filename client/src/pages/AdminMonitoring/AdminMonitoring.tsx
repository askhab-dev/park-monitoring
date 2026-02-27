import { InnerMenu } from './ui/InnerMenu/InnerMenu';
import styles from './AdminMonitoring.module.css';
import { Header } from '@/widgets/Header';
import { LeftMenu } from '@/widgets/LeftMenu/LeftMenu';

import { Monitoring } from '@/features/monitoring';

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
  );
};
