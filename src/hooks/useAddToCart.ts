import { useDispatch } from "react-redux";
import { useI18n } from "@/services/i18n/I18nContext";
import type { Product } from "@/models/Product";
import { addItem } from "@/services/state/cartSlice";
import type { AppDispatch } from "@/services/state/store";
import { showSuccessToast } from "@/utils/toast";

export const useAddToCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();

  const addToCart = (product: Product, count: number) => {
    if (count <= 0) return;

    dispatch(addItem({ product: product, count: count }));

    showSuccessToast( count > 1
            ? t("common.items_added_in_cart", { title: product.title })
            : t("common.item_added_in_cart", { title: product.title }));
    
  };

  return { addToCart };
};
