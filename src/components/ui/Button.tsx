import React, { type Ref } from "react";

type ButtonVariant = "primary" | "outline" | "text" | "dropdown";

export interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  ref,
}: ButtonProps) => {
  const baseStyles =
    "px-2 py-1 radius-6 text-base justify-content-space-between align-items-center";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-color-on-primary no-border",
    outline: "bg-transparent border-primary text-primary button-outline",
    text: "text-primary bg-transparent",
    dropdown: "bg-transparent dropdown-colors button-outline",
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
