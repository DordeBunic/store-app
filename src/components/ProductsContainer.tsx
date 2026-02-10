import { useNavigate } from "react-router";
import ProductCard from "@/components/ProductCard";
import { POST_LOGIN_PAGES } from "@/constants/pageRoutes";
import { useDispatch } from "react-redux";
import { addToast } from "@/services/state/toastSlice";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import ImageText from "./ImageText";
import { useI18n } from "@/services/i18n/I18nContext";
import type { AppDispatch } from "@/services/state/store";
import { addItem } from "@/services/state/cartSlice";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import { BiSolidError } from "react-icons/bi";

const ProductsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const { data, error, isLoading } = useFilteredProducts();

  if (error) {
    return (
      <ImageText type="error" text={t("errors.general")}>
        <BiSolidError size={70} />
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
            dispatch(
              addToast({
                message: t("common.item_added_in_cart", {
                  title: product.title,
                }),
                type: "success",
              }),
            );
          }}
        />
      ))}
    </>
  );
};

export default ProductsContainer;
