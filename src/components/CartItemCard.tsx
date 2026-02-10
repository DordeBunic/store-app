import Stepper from "./Stepper";
import type { CartItem } from "@/models/CartItem";
import { useDispatch } from "react-redux";
import { updateItem, deleteItem } from "@/services/state/cartSlice";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useI18n } from "@/services/i18n/I18nContext";
import { Typography } from "./ui/Text";
import type { AppDispatch } from "@/services/state/store";

interface CartItemProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemProps) => {
  const { t } = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const [count, setCount] = useState(item.count);

  const handleCountChange = (newValue: number) => {
    setCount(newValue);

    if (newValue <= 0) {
      dispatch(deleteItem(item.item.id));
    } else {
      dispatch(updateItem({ ...item, count: newValue }));
    }
  };

  const handleRemove = () => {
    dispatch(deleteItem(item.item.id));
  };

  return (
    <div className="position-relative p-2 pr-9">
      <IoCloseSharp
        className="cart-item-remove grid bg-transparent no-border text-lg position-absolute color-primary"
        onClick={handleRemove}
        aria-label="Remove item"
      ></IoCloseSharp>

      <div className="flex flex-column gap-6">
        <img
          src={item.item.image}
          alt={item.item.title}
          className="cart-item-image"
        />

        <div className="flex flex-row gap-3 justify-content-space-between align-items-start">
          <Typography className="m-0 clamp clamp-1 bold-text" as="h5">
            {item.item.title}
          </Typography>
          <Typography>
            {t("common.price")}:{" "}
            <b className="text-primary">{item.item.price.toFixed(2)}$</b>
          </Typography>
          <Stepper showDeleteIcon value={count} onChange={handleCountChange} />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
