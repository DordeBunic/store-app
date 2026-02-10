import type { Category } from "@/models/Category";

export interface Filters {
  s: string;
  min: number | undefined;
  max: number | undefined;
  c: Category;
}

export const buildSearchParams = (filters: Filters) => {
  const params: Record<string, string> = {};
  if (filters.s) params.s = filters.s;
  if (filters.min) params.min = filters.min.toString();
  if (filters.max) params.max = filters.max.toString();
  if (filters.c) params.c = filters.c;
  return params;
};

export const parseFiltersFromParams = (params: URLSearchParams): Filters => ({
  s: params.get("s")?.toLowerCase() ?? "",
  min: Number(params.get("min")) || undefined,
  max: Number(params.get("max")) || undefined,
  c: (params.get("c") as Category) ?? ("" as Category),
});

export const parseFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): Filters => {
  const s = searchParams.get("s")?.toLowerCase() ?? "";

  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");

  return {
    s,
    min: minParam !== null ? Number(minParam) : 0,
    max: maxParam !== null ? Number(maxParam) : Infinity,
    c: (searchParams.get("c") as Category) ?? "",
  };
};
