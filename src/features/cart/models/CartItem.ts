import type { Product } from "@/features/products/models/Product";

export interface CartItem {
  count: number;
  item: Product;
}
