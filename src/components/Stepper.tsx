import RoundButton from "./ui/RoundButton";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import { pad2 } from "@/utils/number";

interface StepperProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  showDeleteIcon?: boolean;
}

const Stepper = ({
  value,
  onChange,
  min = 0,
  max = 99,
  showDeleteIcon = false,
}: StepperProps) => {
  const isMin = value <= min;
  const isMax = value >= max;

  const handleDecrement = () => {
    if (isMin) return;
    onChange(value - 1);
  };

  const handleIncrement = () => {
    if (isMax) return;
    onChange(value + 1);
  };

  const renderLeftIcon = () => {
    if (showDeleteIcon && value <= 1 && min === 0) {
      return <MdOutlineDelete />;
    }
    return <HiOutlineMinus />;
  };

  return (
    <div className="flex">
      <RoundButton
        className="radius-br-10 radius-tr-10"
        onClick={handleDecrement}
        size="sm"
        disabled={isMin}
      >
        {renderLeftIcon()}
      </RoundButton>

      <RoundButton
        size="sm"
        className="radius-0 round-button-disabled"
        disabled
      >
        {pad2(value)}
      </RoundButton>

      <RoundButton
        className="radius-bl-10 radius-tl-10"
        onClick={handleIncrement}
        size="sm"
        disabled={isMax}
      >
        <HiOutlinePlus />
      </RoundButton>
    </div>
  );
};

export default Stepper;
