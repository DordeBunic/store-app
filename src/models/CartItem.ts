import type { Product } from "./Product";

export interface CartItem {
  count: number;
  item: Product;
}
