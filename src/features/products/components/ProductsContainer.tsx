import { useNavigate } from "react-router";
import ProductCard from "@features/products/components/ProductCard";
import { POST_LOGIN_PAGES } from "@shared/constants/pageRoutes";
import { useDispatch } from "react-redux";
import ProductCardSkeleton from "@features/products/components/ProductCardSkeleton";
import ImageText from "@shared/components/ImageText";
import { useI18n } from "@features/i18n/I18nContext";
import type { AppDispatch } from "@app/store";
import { addItem } from "@/features/cart/state/cartSlice";
import useFilteredProducts from "@features/products/hooks/useFilteredProducts";
import { BiSolidError } from "react-icons/bi";
import { showSuccessToast } from "@shared/utils/toast";
import { IconSizes } from "@shared/constants/iconSizes";

const ProductsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const { data, error, isLoading } = useFilteredProducts();

  if (error) {
    return (
      <ImageText type="error" text={t("errors.general")}>
        <BiSolidError size={IconSizes.lg} />
      </ImageText>
    );
  }

  if (isLoading) {
    const SKELETON_COUNT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return SKELETON_COUNT.map((e) => <ProductCardSkeleton key={e} />);
  }

  return (
    <>
      {data?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDetails={() => {
            navigate(
              POST_LOGIN_PAGES.PRODUCT_DETAILS_PAGE.replace(
                ":id",
                product.id.toString(),
              ),
            );
          }}
          onAddToCard={() => {
            dispatch(addItem({ product: product }));
            showSuccessToast(
              t("common.item_added_in_cart", { title: product.title }),
              dispatch,
            );
          }}
        />
      ))}
    </>
  );
};

export default ProductsContainer;
