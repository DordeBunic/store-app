import React from "react";
import Input from "./Input";

type InputProps<T> = {
  name: keyof T;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

const FormInput = <T extends object>({
  disabled = false,
  name,
  ...props
}: InputProps<T>) => {
  const baseStyles = "px-3 py-2 radius-6 text-base";

  return (
    <Input
      disabled={disabled}
      name={String(name)}
      className={baseStyles}
      {...props}
    />
  );
};

export default FormInput;
