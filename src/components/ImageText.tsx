import { Typography, type TextSize } from "./ui/Text";

export type ImageTextType = "primary" | "info" | "error" | "warning" | "text";

interface ImageTextProps {
  text: string;
  type?: ImageTextType;
  children?: React.ReactNode;
  className?: string;
  textSize?: TextSize;
  horizontal?: boolean;
}

export const ImageText = ({
  text,
  type = "text",
  children,
  className = "",
  textSize = "xl",
  horizontal = false,
}: ImageTextProps) => {
  const colorClass = `text-${type}`;
  const horizontalClass = horizontal ? "" : "flex-row";
  return (
    <div
      className={`mx-auto align-items-center flex ${horizontalClass} items-center gap-4 text-center ${className}`}
    >
      {children && <div className={colorClass}>{children}</div>}

      <Typography size={textSize} className={`${colorClass}`}>
        {text}
      </Typography>
    </div>
  );
};

export default ImageText;
