import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/services/state/store";
import CartItemCard from "@/components/CartItemCard";
import Button from "@/components/ui/Button";
import { deleteAllItems } from "@/services/state/cartSlice";
import { addToast } from "@/services/state/toastSlice";
import { BsCartX } from "react-icons/bs";
import { useI18n } from "@/services/i18n/I18nContext";
import { Typography } from "@/components/ui/Text";
import ImageText from "@/components/ImageText";

const CartPage = () => {
  const { t } = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const totalItems = cart.cartItems.reduce(
    (sum, cartItem) => sum + cartItem.count,
    0,
  );
  const totalPrice = cart.cartItems.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.count,
    0,
  );

  if (totalItems == 0)
    return (
      <div className="flex flex-row justify-content-center gap-6 pt-10 text-align-center">
        <ImageText type="info" text={t("errors.empty_cart")}>
          <BsCartX size={70} />
        </ImageText>
      </div>
    );

  return (
    <div className="page-max-width flex-grow-1 flex flex-row gap-5">
      <Typography as="h1" className="p-4 bold-text">
        {t("page_titles.cart")}
      </Typography>
      <div className="border-thin radius-10 text border-color">
        <div className="flex flex-row gap-5 px-3">
          {cart.cartItems?.map((item, index) => (
            <div key={item.item.id}>
              <CartItemCard item={item} />
              {cart.cartItems.length !== index + 1 && (
                <hr className="m-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-column justify-content-end">
        <div className="flex flex-column gap-5 align-items-center">
          <div className="flex flex-row gap-10 border-thin p-10 radius-7 border-color">
            <Typography className="text-align-center">
              {t(
                totalItems === 1
                  ? "common.subtotal_one"
                  : "common.subtotal_many",
                {
                  count: totalItems,
                },
              )}
              <b className="text-primary text-lg">{totalPrice.toFixed(2)}$</b>
            </Typography>
            <Button
              disabled={totalItems == 0}
              onClick={() => {
                dispatch(deleteAllItems());
                dispatch(
                  addToast({
                    message: "Successful purchase",
                    type: "success",
                  }),
                );
              }}
            >
              {t("common.order")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
