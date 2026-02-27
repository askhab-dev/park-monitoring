import { SWRConfig } from 'swr';
import { AdminMonitoring } from '@/pages/AdminMonitoring';

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
      <AdminMonitoring />
    </SWRConfig>
  );
};
