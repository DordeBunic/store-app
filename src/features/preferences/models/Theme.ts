import type { DropdownModel } from "@shared/models/DropdownModel";

export const Theme = {
  red: "red",
  blue: "blue",
  green: "green",
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

export const Themes: DropdownModel<Theme>[] = [
  { value: Theme.blue, label: "colors.blue" },
  { value: Theme.red, label: "colors.red" },
  { value: Theme.green, label: "colors.green" },
];
