import { IconSizes } from "@shared/constants/iconSizes";
import React from "react";

export interface SpinnerProps {
  size?: number;
  thickness?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = IconSizes.lg,
  thickness = 5,
  className = "",
}) => {
  return (
    <div
      className={`spinner ${className}`}
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
      }}
    />
  );
};

export default Spinner;
