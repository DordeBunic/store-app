import React from "react";

type RoundButtonSize = "sm" | "md" | "lg";

interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: RoundButtonSize;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  children,
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`radius-full round-button inline-flex text-color-on-primary bg-primary justify-content-center align-items-center no-border round-button-${size}  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default RoundButton;
