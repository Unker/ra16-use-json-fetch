import { useState, useEffect } from 'react';

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

type UseJsonFetchResult = [any, boolean, Error | null];

const useJsonFetch = (
  url: string,
  opts: FetchOptions
): UseJsonFetchResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, opts);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, opts]);

  return [data, loading, error];
};

export default useJsonFetch;