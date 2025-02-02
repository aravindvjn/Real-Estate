import React, { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface StarRatingProps {
  maxStars?: number;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, onChange }) => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (newRating: number) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="flex space-x-1 py-2">
      <input type="hidden" name="rating" value={rating} />
      {Array.from({ length: maxStars }, (_, i) => (
        <button
          type="button"
          key={i}
          onClick={() => handleClick(i + 1)}
          className="focus:outline-none"
        >
          {i < rating ? (
            <IoStar className="text-yellow-500 text-2xl" />
          ) : (
            <IoStarOutline className="text-gray-400 text-2xl" />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
