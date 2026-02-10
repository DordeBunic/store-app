import { Dropdown } from "@/components/ui/Dropdown";
import { useTranslatedDropdown } from "@/hooks/useTranslatedDropdown";
import { Categories, type Category } from "@/models/Category";

interface CategorySelectorProps {
  value: Category;
  onValueChange: (value: Category) => void;
}

const CategorySelector = ({ value, onValueChange }: CategorySelectorProps) => {
  const categories = useTranslatedDropdown(Categories);

  return (
    <Dropdown
      customClasses="full-width"
      value={value}
      onChange={onValueChange}
      options={categories}
    />
  );
};

export default CategorySelector;
