import { API_ROUTES } from "@/constants/apiRoutes";
import type { Product } from "@/models/Product";
import useData from "./useData";

const useFetchProducts = () => useData<Product[]>(API_ROUTES.PRODUCTS);

export default useFetchProducts;
