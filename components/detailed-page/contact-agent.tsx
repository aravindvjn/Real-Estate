import React from "react";
import Input from "../ui/input";

const ContactAgent = () => {
  return (
    <div className="py-2">
      <p className="text-lg md:text-xl font-bold py-3">Contact Agent</p>
      <form action="" className="flex flex-col gap-2 sm:gap-4 max-w-[500px]">
        <Input name="name" onlyPlaceholder="Your Name" />
        <Input name="email" onlyPlaceholder="Your Email" />
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            className="border px-3 py-2 rounded-lg "
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-3 w-fit rounded-md bg-blue-600 text-white"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactAgent;
