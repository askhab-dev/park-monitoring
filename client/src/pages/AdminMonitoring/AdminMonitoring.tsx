import { lazy, Suspense } from 'react';
import { InnerMenu } from './ui/InnerMenu/InnerMenu';
import styles from './AdminMonitoring.module.css';
import { Header } from '@/widgets/Header';
import { LeftMenu } from '@/widgets/LeftMenu/LeftMenu';
import { Loader } from '@/shared/ui/Loader/Loader';

const MonitoringPage = lazy(() =>
  import('@/features/monitoring').then((m) => ({
    default: m.Monitoring,
  })),
);

export const AdminMonitoring: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <LeftMenu />
        <InnerMenu />
        <Suspense fallback={<Loader fullscreen />}>
          <MonitoringPage />
        </Suspense>
      </main>
    </>
  );
};
