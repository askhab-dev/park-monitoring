export const BASE_API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const fetcher = <T>(url: string): Promise<T> =>
  fetch(`${BASE_API_URL}${url}`).then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        throw new Error(text || res.statusText);
      });
    }
    return res.json();
  });
