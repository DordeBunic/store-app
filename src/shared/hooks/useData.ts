import { useEffect, useState } from "react";
import { api } from "@/services/api/apiClient";

type UseDataOptions = {
  params?: Record<string, string | number>;
  requestInit?: RequestInit;
};

const useData = <T>(
  endpoint: string,
  options?: UseDataOptions,
  deps: any[] = [],
) => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(
    () => {
      const controller = new AbortController();
      setIsLoading(true);
      setError("");

      api<T>(endpoint, {
        params: options?.params,
        signal: controller.signal,
        ...options?.requestInit,
      })
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          setError(err.message || "Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : [],
  );

  return { data, error, isLoading };
};

export default useData;
