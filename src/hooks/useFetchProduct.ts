import { API_ROUTES } from "@/constants/apiRoutes";
import type { Product } from "@/models/Product";
import useData from "./useData";

const useFetchProduct = (productId: string) =>
  useData<Product>(API_ROUTES.PRODUCT_BY_ID.replace(":id", productId));

export default useFetchProduct;
