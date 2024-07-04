import { Star, StarHalf } from "lucide-react";

interface Props {
  value: number;
  size: number;
}

const AverageReview = ({ value, size }: Props) => {
  return (
    <div
      className="flex flex-row gap-2 items-center px-2 py-2 rounded-full
        bg-secondary w-fit"
    >
      {value >= 1 ? (
        <Star className="text-primary" size={size} />
      ) : value >= 0.5 ? (
        <StarHalf className="text-primary" size={size} />
      ) : (
        ""
      )}
      {value >= 2 ? (
        <Star className="text-primary" size={size} />
      ) : value >= 1.5 ? (
        <StarHalf className="text-primary" size={size} />
      ) : (
        ""
      )}
      {value >= 3 ? (
        <Star className="text-primary" size={size} />
      ) : value >= 2.5 ? (
        <StarHalf className="text-primary" size={size} />
      ) : (
        ""
      )}
      {value >= 4 ? (
        <Star className="text-primary" size={size} />
      ) : value >= 3.5 ? (
        <StarHalf className="text-primary" size={size} />
      ) : (
        ""
      )}
      {value >= 5 ? (
        <Star className="text-primary" size={size} />
      ) : value >= 4.5 ? (
        <StarHalf className="text-primary" size={size} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AverageReview;
