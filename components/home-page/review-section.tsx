"use client";
import React, { useActionState, useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Rating from "./rating";
import { addReview } from "@/lib/actions/add-review";
import StarRating from "../ui/star-rating";
import { getReviews } from "@/lib/functions/getReviews";
import Image from "next/image";

const ReviewSection = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [state, action, isPending] = useActionState(addReview, {
    message: "",
    success: false,
  });

  const [rating, setRating] = useState<number>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [review, setReview] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev < review.length - 1 ? prev + 1 : prev));
  };

  const previousReview = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    const fetchReview = async () => {
      const res = await getReviews();
      if (res) {
        setReview(res.randomReview);
        setRating(res.averageRating);
      }
    };

    fetchReview();
  }, []);

  return (
    <div className="md:py-[50px] px-[10px] pb-5 sm:px-[50px] md:px-[100px] lg:px-[200px]">
      <div className="flex flex-col sm:flex-row  sm:items-center my-1 rounded justify-between gap-3 sm:gap-5 md:gap-16 ">
        <div className="text-[10px] self-start flex-1 sm:text-[12px]">
          <p className="font-semibold text-sm sm:text-lg md:text-xl">
            What Our Customers Are Saying
          </p>
          <p className="text-gray-600 my-2">
            Your satisfaction is our priority. Here{`'`}s what our happy customers
            have to say about their experience with us.
          </p>
          <Rating rate={rating || 0} />
        </div>
        {review?.length > 0 ? (
          <div className="text-[10px] flex flex-col gap-3 flex-1 sm:text-[12px]">
            <p className="font-semibold text-[14px] sm:hidden">Reviews</p>
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  height={50}
                  width={50}
                  className="rounded-full h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]"
                  alt="user profile"
                  src={review[currentIndex]?.profile_picture_url}
                />
              </div>
              <p className="text-[12px] sm:text-sm font-semibold">
                {review[currentIndex].first_name}{" "}
                {review[currentIndex].last_name}
              </p>
            </div>
            <p className="">{`"${review[currentIndex].review_text}"`}</p>
            <div className="flex items-center gap-[40px] p-2">
              <GrPrevious
                className={`cursor-pointer ${
                  currentIndex === 0 ? "opacity-35" : ""
                }`}
                onClick={previousReview}
              />
              <GrNext
                className={`cursor-pointer ${
                  currentIndex === review.length - 1 ? "opacity-35" : ""
                }`}
                onClick={nextReview}
              />
            </div>
            <button
              className="pb-[30px] text-[12px] text-blue-500 self-start underline"
              onClick={() => setShowInput(true)}
            >
              Add new review
            </button>
          </div>
        ) : (
          <div className="flex-1 opacity-40 text-[10px]">Loading...</div>
        )}
      </div>
      {showInput && (
        <form action={action}>
          <textarea
            minLength={3}
            maxLength={200}
            className="border h-[100px] border-black w-full text-[12px] placeholder:text-[12px] p-3 rounded-md"
            name="review_text"
            placeholder="Express your thoughts"
            required
          />
          <StarRating />
          {state.message && (
            <p
              className={
                state.success
                  ? "text-green-500 text-[12px]"
                  : "text-red-500 text-[12px]"
              }
            >
              {state.message}
            </p>
          )}
          <button className="px-3 mb-3 mt-1 py-1 text-white rounded bg-blue-600 text-[12px] sm:text-[14px]">
            {isPending ? "Submiting..." : "Submit"}
          </button>
        </form>
      )}
      <hr />
    </div>
  );
};

export default ReviewSection;
