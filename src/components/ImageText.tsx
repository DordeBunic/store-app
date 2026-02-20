import type { ImageTextType } from "@/models/ImageTextType";
import Text, { type TextSize } from "./ui/Text";


interface ImageTextProps {
  text: string;
  type?: ImageTextType;
  children?: React.ReactNode;
  className?: string;
  textSize?: TextSize;
  horizontal?: boolean;
}

const ImageText = ({
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

      <Text size={textSize} className={`${colorClass}`}>
        {text}
      </Text>
    </div>
  );
};

export default ImageText;
