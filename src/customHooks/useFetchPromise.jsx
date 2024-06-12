import { debounce } from "lodash";
import { useEffect, useState, useCallback } from "react";

const useFetchPromise = (
  apiURL,
  transformData,
  debounceWait,
  isAutoComplete
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Define fetchData function with useCallback to memoize it
  const fetchData = useCallback(
    debounce(async (url, transform, signal) => {
      console.log("Making Api call and fetching data.");
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setData(transform(data));
      } catch (error) {
        if (!signal.aborted) setError(error);
      }
    }, debounceWait),
    [] // Empty dependencies array to ensure it's created once
  );

  useEffect(() => {
    if (!apiURL || !isAutoComplete) {
      setData(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    fetchData(apiURL, transformData, signal);

    return () => {
      controller.abort();
    };
  }, [apiURL, transformData, fetchData]);

  return [data, error];
};

export default useFetchPromise;
