import { Typography } from "./Text";

type BadgeVariant = "error" | "warning" | "info" | "success";

interface BadgeProps {
  number: number;
  variant?: BadgeVariant;
  className?: string; // optional escape hatch
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  error: "bg-error text-color-on-primary",
  warning: "bg-warning text-color-on-primary",
  info: "bg-info text-color-on-primary",
  success: "bg-success text-color-on-primary",
};

const Badge = ({ number, variant = "info", className = "" }: BadgeProps) => {
  if (number === 0) return null;

  return (
    <Typography
      className={[
        "badge position-absolute flex align-items-center justify-content-center radius-full text-sm p-0",
        VARIANT_CLASSES[variant],
        className,
      ].join(" ")}
    >
      {number > 99 ? "+99" : number}
    </Typography>
  );
};

export default Badge;
