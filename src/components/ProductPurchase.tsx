import Stepper from "@/components/Stepper";
import Button from "@/components/ui/Button";
import { useI18n } from "@/services/i18n/I18nContext";
import { Typography } from "./ui/Text";
import Rating from "./Rating";

type Props = {
  title: string | undefined;
  price: number;
  count: number;
  ratings: number;
  ratingsCount: number;
  onCountChange: (value: number) => void;
  onAdd: () => void;
};

const ProductPurchase = ({
  title,
  price,
  count,
  ratings,
  ratingsCount,
  onCountChange,
  onAdd,
}: Props) => {
  const { t } = useI18n();

  return (
    <div className="details-info flex flex-row gap-6 justify-content-space-between border-thin radius-10 p-5 border-color">
      <div className="flex flex-row gap-3">
        <Rating stars={ratings} count={ratingsCount} />
        <Typography size="4xl" className="bold-text">
          {title}
        </Typography>
        <Typography className="mt-4 text-primary" size="3xl">
          {price.toFixed(2)}$
        </Typography>
      </div>

      <div className="flex gap-4 align-items-center details-buy">
        <Stepper
          value={count}
          onChange={(value) => onCountChange(Math.max(0, value))}
        />

        <Button
          variant="primary"
          className="text-xs full-width px-4 radius-10"
          disabled={count <= 0}
          onClick={onAdd}
        >
          {t("common.add_to_cart")}
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default ProductPurchase;
