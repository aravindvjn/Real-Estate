"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SelectRange = ({
  priceRange,
  setPriceRange,
}: {
  priceRange: [number, number];
  setPriceRange: (newRange: [number, number]) => void;
}) => {
  
  const formatPrice = (price: number) => (price > 99 ? price / 100 : price);
  const priceLabel = (price: number) => (price > 99 ? "crore" : "lakh");

  return (
    <div className="flex py-3 text-gray-800 flex-col">
      <p className="italic text-left">Price Range</p>
      <Slider
        range
        min={0}
        max={500}
        value={priceRange}
        onChange={(newRange) => setPriceRange(newRange as [number, number])}
        trackStyle={{ backgroundColor: "blue", height: 6 }}
        handleStyle={{
          borderColor: "blue",
          backgroundColor: "blue",
          height: 20,
          width: 20,
          marginTop: -7,
        }}
        railStyle={{ backgroundColor: "#ddd", height: 6 }}
        step={1}
      />
      <div className="mt-2 text-center text-sm font-medium">
        Min: ₹{formatPrice(priceRange[0])} {priceLabel(priceRange[0])} - ₹
        {formatPrice(priceRange[1])} {priceLabel(priceRange[1])}
      </div>
    </div>
  );
};

export default SelectRange;
