import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const Rating = ({ rate = 5 }: { rate: number }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push(<IoStar key={i} className="text-yellow-500" />);
      } else if (rate >= i - 0.5) {
        stars.push(<IoStarHalf key={i} className="text-yellow-500" />);
      } else {
        stars.push(<IoStarOutline key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div>
      <p className="text-xl font-bold">{rate}</p>
      <p>Overall rating</p>
      <div className="flex">{renderStars()}</div>
    </div>
  );
};

export default Rating;
