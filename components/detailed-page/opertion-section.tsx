"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { managePost } from "@/lib/actions/manage-post";
import Heading from "../ui/heading";
import toast from "react-hot-toast";

type ShowPopUpType = "delete" | "sold";

const OperationSection = ({ isAdmin }: { isAdmin: boolean }) => {
  const { id } = useParams();

  const [showPopUp, setShowPopUp] = useState<ShowPopUpType | null>(null);

  //managing the post
  const [state, formAction, isPending] = useActionState(
    managePost.bind(null, id, showPopUp ?? "sold"),
    { message: "", success: false }
  );

  //If success, Close the popop
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
    if (state.success) {
      setShowPopUp(null);
    }
  }, [state.message]);

  return (
    <div className="pt-4">
      <Heading text="Manage Property" />
      <div className="flex gap-3">
        {!isAdmin && (
          <div className="text-blue-500 flex flex-col gap-2 px-5 py-2 bg-blue-200 border border-blue-700 rounded sm:w-fit">
            <Link href={`/properties/${id}/edit`}>Edit Post</Link>
          </div>
        )}
        <button
          className="bg-red-500 px-5 py-2 border border-red-600 text-white rounded"
          onClick={() => setShowPopUp("delete")}
        >
          Delete Post
        </button>
        <button
          className="bg-yellow-500 font-bold px-5 py-2 border border-yellow-600 text-white rounded"
          onClick={() => setShowPopUp("sold")}
        >
          Mark as Sold
        </button>

        {typeof window !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {showPopUp && (
                <motion.div
                  className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowPopUp(null)}
                >
                  <motion.div
                    className="bg-white rounded-lg p-5 shadow-lg"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {state?.message && (
                      <p
                        className={
                          state?.success ? "text-green-500" : "text-red-500"
                        }
                      >
                        {state.message}
                      </p>
                    )}
                    <h2 className="text-lg font-semibold mb-3">
                      {showPopUp === "delete"
                        ? "Confirm Deletion"
                        : "Mark as Sold"}
                    </h2>
                    <p>Are you sure you want to proceed?</p>
                    <form
                      action={formAction}
                      className="flex justify-end mt-4 gap-2"
                    >
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={() => setShowPopUp(null)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded text-white ${
                          showPopUp === "delete"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {isPending ? "pending..." : "Confirm"}
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
      {isAdmin && (
        <p className="py-2 text-green-500">
          As an admin you can manage this post.
        </p>
      )}
    </div>
  );
};

export default OperationSection;
