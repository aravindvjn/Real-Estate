"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import { OpportunityCellProps } from "./options";
import { applyJob } from "@/lib/actions/apply-jobs";
import toast from "react-hot-toast";

const GridCell = ({
  title,
  description,
  link,
  image,
  image_className,
  button_text,
}: OpportunityCellProps) => {
  const [state, formAction, isPending] = useActionState(applyJob, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state.message]);

  return (
    <div className="flex flex-col rounded-md gap-2 shadow-md text-[14px]">
      <Image
        className={`w-full flex ${image_className}`}
        src={image}
        alt={title}
        height={400}
        width={400}
      />
      <div className="flex flex-col rounded-md gap-2 p-2 px-3 sm:px-5 pb-3 sm:pb-5 text-[14px]">
        <p className="text-md sm:text-lg font-bold line-clamp-2">{title}</p>
        <p className="text-[12px] sm:text-sm line-clamp-2">{description}</p>
        {link ? (
          <Link
            className="px-3 py-2 bg-blue-600 rounded text-white w-fit"
            href={link}
          >
            {button_text || "Click here"}
          </Link>
        ) : (
          <form action={formAction}>
            <input type="hidden" name="title" defaultValue={title} />
            <button
              className="px-3 py-2 bg-blue-600 rounded text-white w-fit"
              type="submit"
            >
              {isPending ? "Applying..." : "Apply Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default GridCell;
