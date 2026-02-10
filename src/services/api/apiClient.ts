import { API_ROUTES } from "@/constants/apiRoutes";
import { getAuthToken } from "./authToken";

type RequestOptions = RequestInit & {
  params?: Record<string, string | number>;
};

export async function api<T>(
  endpoint: string,
  { params, headers, ...options }: RequestOptions = {},
): Promise<T> {
  let url = `${API_ROUTES.BASE_URL}${endpoint}`;

  if (params) {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    );
    url += `?${query.toString()}`;
  }

  const token = await getAuthToken();

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}
