import { API_ROUTES } from "@shared/constants/apiRoutes";
import type { Product } from "@features/products//models/Product";
import useData from "@shared/hooks/useData";

const useFetchProducts = () => useData<Product[]>(API_ROUTES.PRODUCTS);

export default useFetchProducts;
