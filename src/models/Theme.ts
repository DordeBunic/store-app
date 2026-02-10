import type { DropdownModel } from "./DropdownModel";

export type Theme = "red" | "blue" | "green";

export const Themes: DropdownModel<Theme>[] = [
  { value: "blue", label: "colors.blue" },
  { value: "red", label: "colors.red" },
  { value: "green", label: "colors.green" },
];
