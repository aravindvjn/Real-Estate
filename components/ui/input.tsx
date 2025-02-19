import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  onlyPlaceholder?: string;
}
const Input = ({
  name,
  onlyPlaceholder,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1" >
      <label className="capitalize" htmlFor={name}>
        {placeholder || name}
      </label>
      <input
        id={name}
        className="outline-[1px] outline-gray-200 outline px-3 h-10 flex justify-center items-center rounded-lg bg-white placeholder:capitalize "
        {...props}
        name={name}
        placeholder={onlyPlaceholder || placeholder || name}
      />
    </div>
  );
};

export default Input;
