import { useState, useEffect } from 'react';

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

type UseJsonFetchResult = [any, boolean, string | null];

const useJsonFetch = (
  url: string,
  opts: FetchOptions
): UseJsonFetchResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(url, opts);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);

      } catch (err: any) {
        let errorMessage = 'Unknown error';

        if (err.message.includes('JSON')) {
          errorMessage = 'Error parsing response: Response is not in JSON format';
        } else {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return [data, loading, error];
};

export default useJsonFetch;