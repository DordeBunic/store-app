import { useCallback, useEffect, useRef, useState } from "react";
import ProductsContainer from "@/components/ProductsContainer";
import { Typography } from "@/components/ui/Text";
import { FiFilter } from "react-icons/fi";
import ProductsFilter from "@/components/ProductFilters";
import { useI18n } from "@/services/i18n/I18nContext";
import { isMobile } from "@/utils/other";

type Position = {
  top: number;
  left: number;
};

const POPOVER_WIDTH = 256;
const OFFSET = 4;

const ProductsPage: React.FC = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const calculatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();

    const left = Math.max(
      OFFSET,
      isMobile()
        ? rect.right + window.scrollX - POPOVER_WIDTH - 24
        : rect.right + window.scrollX - POPOVER_WIDTH,
    );

    setPosition({
      top: rect.bottom + window.scrollY + OFFSET,
      left,
    });
  }, []);

  const togglePopover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    calculatePosition();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    calculatePosition();

    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition, true);

    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition, true);
    };
  }, [open, calculatePosition]);

  return (
    <div className="page-width relative">
      <div className="flex justify-content-space-between align-items-center">
        <Typography as="h1" className="p-4 bold-text">
          {t("page_titles.products")}
        </Typography>

        <button
          ref={triggerRef}
          type="button"
          onClick={togglePopover}
          aria-label="Open filters"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="icon-link cursor-pointer bg-transparent no-border p-1"
        >
          <FiFilter size={26} className="primary-color text-primary" />
        </button>
      </div>

      <ProductsFilter
        open={open}
        position={position}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
      />

      <div className="product-grid gap-5 mt-4">
        <ProductsContainer />
      </div>
    </div>
  );
};

export default ProductsPage;
