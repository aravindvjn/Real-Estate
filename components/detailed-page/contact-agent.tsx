"use client";
import React, { useActionState } from "react";
import Input from "../ui/input";
import { sendMail } from "@/lib/actions/sendMail";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ContactAgent = ({ email }: { email: string }) => {
  const [state, formAction, isPending] = useActionState(sendMail, "");
  const { data: session, status } = useSession();
  const { id } = useParams();

  if (status === "loading") {
    return <p className="pt-5 opacity-60">Loading...</p>;
  }

  if (session?.user?.email === email) {
    return (
      <div className="mt-5 text-blue-500 flex flex-col gap-2 px-5 py-2 bg-blue-200 border border-blue-700 rounded-lg sm:w-fit">
        <Link href={`/properties/${id}/edit`}>Edit Post</Link>
      </div>
    );
  }

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

  if (!email) return;

  return (
    <div className="py-2">
      <p className="text-lg md:text-xl font-bold py-3">Contact Agent</p>
      <form
        action={formAction}
        className="flex flex-col gap-2 text-sm sm:gap-4 max-w-[500px]"
      >
        <Input name="name" onlyPlaceholder="Your Name" />
        <Input
          value={session?.user?.email}
          disabled
          name="dummy"
          placeholder="email"
          onlyPlaceholder="Your Email"
        />
        <input name="sender_email" type="hidden" value={session?.user?.email} />
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
