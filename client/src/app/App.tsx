import { lazy, Suspense } from 'react';
import { SWRConfig } from 'swr';
import { Loader } from '@/shared/ui/Loader/Loader';

const AdminMonitoringPage = lazy(() =>
  import('../pages/AdminMonitoring').then((m) => ({
    default: m.AdminMonitoring,
  })),
);

export const App = () => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
        dedupingInterval: 10_000,
      }}
    >
      <Suspense fallback={<Loader />}>
        <AdminMonitoringPage />
      </Suspense>
    </SWRConfig>
  );
};
