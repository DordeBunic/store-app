import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "@/models/Product";
import useFetchProducts from "./useFetchProducts";
import { parseFiltersFromSearchParams } from "@/utils/filters";

const useFilteredProducts = () => {
  const { data, error, isLoading } = useFetchProducts();
  const [searchParams] = useSearchParams();

  const { s, min, max, c } = parseFiltersFromSearchParams(searchParams);

  const filteredProducts = useMemo<Product[]>(() => {
    if (!data) return [];

    let filteredData = data.filter((product) => {
      const matchesSearch =
        !s || product.title.toLowerCase().includes(s.toLowerCase());

      const matchesCategory = !c || product.category === c;

      return matchesSearch && matchesCategory;
    });

    if (min !== undefined) {
      filteredData = filteredData.filter((product) => product.price >= min);
    }

    if (max !== undefined) {
      filteredData = filteredData.filter((product) => product.price <= max);
    }

    return filteredData;
  }, [data, s, min, max, c]);

  return {
    data: filteredProducts,
    error,
    isLoading,
  };
};

export default useFilteredProducts;
