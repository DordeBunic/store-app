import { IoStar, IoStarOutline } from "react-icons/io5";
import Typography from "./ui/Text";

interface RatingProps {
  stars: number;
  count: number;
}

const Rating = ({ stars, count }: RatingProps) => {
  return (
    <div className="flex gap-1 text-primary align-items-center text-lg">
      {Array.from({ length: 5 }, (_, index) =>
        index < stars ? <IoStar key={index} /> : <IoStarOutline key={index} />,
      )}
      (
      <Typography size="lg" className="text-primary  bold-text">
        {count}
      </Typography>
      )
    </div>
  );
};

export default Rating;
