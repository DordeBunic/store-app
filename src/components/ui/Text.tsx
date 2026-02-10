import React from "react";

export type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

type AllowedTextElement =
  | "p"
  | "span"
  | "label"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type TypographyProps = {
  as?: AllowedTextElement;
  size?: TextSize;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const defaultSizes: Record<AllowedTextElement, TextSize> = {
  h1: "5xl",
  h2: "4xl",
  h3: "3xl",
  h4: "2xl",
  h5: "xl",
  h6: "lg",
  p: "base",
  span: "base",
  label: "sm",
};

export function Typography({
  as = "p",
  size,
  className = "",
  children,
  ...props
}: TypographyProps) {
  const Component: AllowedTextElement = typeof as === "string" ? as : "p";

  const resolvedSize = size ?? defaultSizes[Component] ?? "base";

  return (
    <Component
      {...props}
      className={`text-text text-${resolvedSize} ${className}`}
    >
      {children}
    </Component>
  );
}

export default Typography;
