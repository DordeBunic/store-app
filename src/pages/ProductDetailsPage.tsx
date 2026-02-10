import { useParams } from "react-router";
import { useState } from "react";

import useFetchProduct from "@/hooks/useFetchProduct";
import { useAddToCart } from "@/hooks/useAddToCart";

import { ImageText } from "@/components/ImageText";
import ProductPurchase from "@/components/ProductPurchase";
import { Typography } from "@/components/ui/Text";
import { BiSolidError } from "react-icons/bi";
import { useI18n } from "@/services/i18n/I18nContext";

const ProductDetailsPage = () => {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const productId = id ? Number(id) : NaN;

  const { data, error } = useFetchProduct(String(productId));
  const { addToCart } = useAddToCart();
  const [itemCount, setItemCount] = useState(0);

  if (!data) return;

  if (Number.isNaN(productId) || error) {
    return (
      <ImageText type="error" text={t("errors.general")}>
        <BiSolidError size={70} />
      </ImageText>
    );
  }

  const handleAddToCart = () => {
    addToCart(data, itemCount);
    setItemCount(0);
  };

  return (
    <div className="flex page-max-width flex-row gap-6 align-items-center">
      <div className="product-details gap-6 full-width">
        <div className="details-image full-available-height">
          <img
            className="radius-10 full-available-max-height full-width border-color border-thin"
            src={data.image}
            alt={data.title}
          />
        </div>

        <ProductPurchase
          title={data.title}
          price={data.price}
          count={itemCount}
          onCountChange={setItemCount}
          onAdd={handleAddToCart}
          ratings={data.rating.rate}
          ratingsCount={data.rating.count}
        />
      </div>

      <div className="full-width border-thin radius-10 border-color">
        <Typography size="lg" className="p-4 text-align-center">
          {data.description}
        </Typography>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
