import { useI18n } from "@features/i18n/I18nContext";
import Button from "@shared/ui/Button";
import Text from "@shared/ui/Text";
import type { Product } from "@features/products/models/Product";

interface ProductCardProps {
  product: Product;
  onAddToCard: () => void;
  onDetails: () => void;
}

const ProductCard = ({ product, onAddToCard, onDetails }: ProductCardProps) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-row full-width border-thin radius-4 bg-white overflow-hidden product-card border-color">
      <img
        className="product-image full-width full-available-height"
        src={product.image}
        alt={product.title}
      />

      <div className="p-2 flex flex-row gap-2 flex-grow-1 justify-content-space-between">
        <Text className="clamp clamp-2 m-0 bold-text" size="lg">
          {product.title}
        </Text>
        <Text className="text-sm clamp clamp-2">
          {product.description}
        </Text>

        <div className="flex flex-row gap-3 mt-2">
          <Text className="bold-text bold-text" size="lg">
            {product.price.toFixed(2)}$
          </Text>

          <div className="flex gap-3">
            <Button
              className="full-width"
              onClick={onDetails}
              variant={"outline"}
            >
              {t("common.details")}
            </Button>
            <Button className="full-width" onClick={onAddToCard}>
              {t("common.add_to_cart")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
