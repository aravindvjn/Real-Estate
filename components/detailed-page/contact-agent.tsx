'use client'
import React, { useActionState } from "react";
import Input from "../ui/input";
import { sendMail } from "@/lib/actions/sendMail";

const ContactAgent = ({ email }: { email: string }) => {
  const [state, formAction, isPending] = useActionState(sendMail, "");
  return (
    <div className="py-2">
      <p className="text-lg md:text-xl font-bold py-3">Contact Agent</p>
      <form
        action={formAction}
        className="flex flex-col gap-2 sm:gap-4 max-w-[500px]"
      >
        <Input name="name" onlyPlaceholder="Your Name" />
        <Input
          name="sender_email"
          placeholder="email"
          onlyPlaceholder="Your Email"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            className="border px-3 py-2 rounded-lg "
          ></textarea>
        </div>
        <input name="email" type="hidden" defaultValue={email} />
        {state && <p className="text-red-600">{state}</p>}
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
