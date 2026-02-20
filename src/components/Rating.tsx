import { IoStar, IoStarOutline } from "react-icons/io5";
import Text from "./ui/Text";

interface RatingProps {
  stars: number;
  count: number;
}

const STAR_IDS = ["s1", "s2", "s3", "s4", "s5"];

const Rating = ({ stars, count }: RatingProps) => {
  return (
    <div className="flex gap-1 text-primary align-items-center text-lg">
      {STAR_IDS.map((id, i) =>
        i < stars ? (
          <IoStar key={id} />
        ) : (
          <IoStarOutline key={id} />
        )
      )}

      (
      <Text size="lg" className="text-primary bold-text">
        {count}
      </Text>
      )
    </div>
  );
};

export default Rating;
