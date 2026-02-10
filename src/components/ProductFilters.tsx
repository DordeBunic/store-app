import React, { useRef, useState, type ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import CategorySelector from "@/components/CategorySelector";
import { useI18n } from "@/services/i18n/I18nContext";
import { useSearchParams } from "react-router-dom";
import { FilterField } from "./FilterField";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  buildSearchParams,
  parseFiltersFromParams,
  type Filters,
} from "@/utils/filters";
import type { Position } from "@/models/Position";

type ProductFilterProps = {
  open: boolean;
  position: Position;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const ProductsFilter: React.FC<ProductFilterProps> = ({
  open,
  position,
  onClose,
  triggerRef,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useI18n();
  const popoverRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popoverRef, triggerRef, onClose, open);

  const [filters, setFilters] = useState<Filters>(
    parseFiltersFromParams(searchParams),
  );

  if (!open) return null;

  const handleSubmit = (event: ChangeEvent) => {
    event.preventDefault();
    setSearchParams(buildSearchParams(filters));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        ref={popoverRef}
        role="dialog"
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          zIndex: 1000,
        }}
        className="bg-white radius-5 p-4 flex flex-row gap-8 popover-shadow"
      >
        <div className="flex flex-row gap-6">
          <FilterField
            label={t("filters.search")}
            value={filters.s}
            onChange={(val) => setFilters({ ...filters, s: val })}
          />

          <FilterField
            label={t("filters.category")}
            value={filters.c}
            onChange={(val) => setFilters({ ...filters, c: val })}
          >
            <CategorySelector
              value={filters.c}
              onValueChange={(val) => setFilters({ ...filters, c: val })}
            />
          </FilterField>

          <FilterField
            label={t("filters.min_price")}
            value={filters.min ?? ""}
            onChange={(val) => setFilters({ ...filters, min: Number(val) })}
            type="number"
          />

          <FilterField
            label={t("filters.max_price")}
            value={filters.max ?? ""}
            onChange={(val) => setFilters({ ...filters, max: Number(val) })}
            type="number"
          />
        </div>

        <Button type="submit">{t("filters.apply")}</Button>
      </div>
    </form>
  );
};

export default ProductsFilter;
