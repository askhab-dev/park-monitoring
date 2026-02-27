import useSWR from 'swr';
import type { SWRResponse } from 'swr';
import { fetcher } from '../lib/api';

export function useApi<T>(url: string): SWRResponse<T, Error> {
  return useSWR<T>(url, fetcher);
}
