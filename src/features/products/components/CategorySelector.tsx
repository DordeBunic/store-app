import { useTranslatedDropdown } from "@/features/i18n/hooks/useTranslatedDropdown";
import { Dropdown } from "@shared/ui/Dropdown";
import { Categories, type Category } from "@features/products/models/Category";

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
