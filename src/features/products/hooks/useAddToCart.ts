import { useDispatch } from "react-redux";
import { useI18n } from "@features/i18n/I18nContext";
import type { Product } from "@features/products//models/Product";
import { addItem } from "@/features/cart/state/cartSlice";
import type { AppDispatch } from "@app/store";
import { showSuccessToast } from "@shared/utils/toast";

export const useAddToCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();

  const addToCart = (product: Product, count: number) => {
    if (count <= 0) return;

    dispatch(addItem({ product: product, count: count }));

    showSuccessToast( count > 1
            ? t("common.items_added_in_cart", { title: product.title })
            : t("common.item_added_in_cart", { title: product.title }),
            dispatch);
    
  };

  return { addToCart };
};
