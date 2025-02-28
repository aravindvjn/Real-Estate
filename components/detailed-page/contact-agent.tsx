"use client";
import React, { useActionState } from "react";
import Input from "../ui/input";
import { sendMail } from "@/lib/actions/sendMail";
import { useSession } from "next-auth/react";
import Link from "next/link";
import OperationSection from "./opertion-section";
import { PropertyTypes } from "../cards/type";

const ContactAgent = ({
  email,
  isAdmin,
  property_details
}: {
  email: string;
  isAdmin: boolean;
  property_details:PropertyTypes
}) => {
  
  //form action to send mail
  const [state, formAction, isPending] = useActionState(sendMail.bind(null,property_details), "");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="pt-5 opacity-60">Loading...</p>;
  }

  //Can edit the property, if its the creator or admin
  if (session?.user?.email === email || isAdmin) {
    return (
      <div>
        <OperationSection isAdmin={isAdmin} />
      </div>
    );
  }

  //User need authentication to contact the property owner
  if (!session?.user?.email) {
    return (
      <div className="mt-5 text-red-500 flex flex-col gap-2 px-5 py-2 bg-red-200 border border-red-700 rounded-lg sm:w-fit">
        <p>
          To contact the agent{" "}
          <Link
            href={"/auth"}
            className="text-blue-600 underline-offset-1 underline"
          >
            Sign In
          </Link>{" "}
          first.
        </p>
      </div>
    );
  }

  //If owner email is not available
  if (!email) return;

  return (
    <div className="py-2">
      <p className="text-lg md:text-xl font-bold py-3">Contact Agent</p>
      <form
        action={formAction}
        className="flex flex-col gap-2 text-sm sm:gap-4 max-w-[500px]"
      >
        <Input name="name" onlyPlaceholder="Your Name" required />
        <Input
          name="phone_number"
          type="tel"
          placeholder="Enter your phone number"
          pattern="^[6-9]\d{9}$"
          maxLength={10}
          title="Enter a valid 10-digit Indian phone number starting with 6-9"
          onlyPlaceholder="Your Phone Number"
          required
        />
        <Input
          value={session?.user?.email}
          disabled
          readOnly
          name="dummy"
          placeholder="your email"
          onlyPlaceholder="Your Email"
          required
        />
        <input name="sender_email" type="hidden" value={session?.user?.email} />
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            className="border px-3 py-2 min-h-[100px] rounded-lg "
            required
          ></textarea>
        </div>
        <input name="email" type="hidden" defaultValue={email} />
        {state && (
          <p
            className={`${
              state === "Email sent successfully!"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {state}
          </p>
        )}
        <button
          type="submit"
          className="px-6 py-3 w-fit rounded-md bg-blue-600 text-white"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactAgent;
