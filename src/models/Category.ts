import type { DropdownModel } from "./DropdownModel";

export type Category =
  | ""
  | "men's clothing"
  | "electronics"
  | "women's clothing"
  | "jewelery";

export const Categories: DropdownModel<Category>[] = [
  { value: "", label: "category.all" },
  { value: "men's clothing", label: "category.mensClothing" },
  { value: "electronics", label: "category.electronics" },
  { value: "women's clothing", label: "category.womenClothing" },
  { value: "jewelery", label: "category.jewelry" },
];
