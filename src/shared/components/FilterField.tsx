import Input from "@shared/ui/Input";
import Text from "@shared/ui/Text";

type FilterFieldProps<T> = {
  label: string;
  value?: T;
  onChange: (value: T) => void;
  type?: "text" | "number";
  children?: React.ReactNode;
};

export const FilterField = <T,>({
  label,
  value,
  onChange,
  type = "text",
  children,
}: FilterFieldProps<T>) => (
  <div className="flex flex-row gap-3">
    <Text>{label}</Text>
    {children ?? (
      <Input
        value={value as any}
        type={type}
        onChange={(e) => onChange(e.target.value as unknown as T)}
      />
    )}
  </div>
);
