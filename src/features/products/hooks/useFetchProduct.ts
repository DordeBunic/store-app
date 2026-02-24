import { API_ROUTES } from "@shared/constants/apiRoutes";
import type { Product } from "@features/products/models/Product";
import useData from "@shared/hooks/useData";

const useFetchProduct = (productId: string) =>
  useData<Product>(API_ROUTES.PRODUCT_BY_ID.replace(":id", productId));

export default useFetchProduct;
