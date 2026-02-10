import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ disabled = false, ...props }) => {
  const baseStyles = "px-3 py-2 radius-6 text-base";
  return <input disabled={disabled} className={`${baseStyles}`} {...props} />;
};

export default Input;
