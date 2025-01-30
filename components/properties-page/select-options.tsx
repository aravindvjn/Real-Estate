"use client";
import React from "react";
import Input from "../ui/input";
import Options from "../ui/options";

export type OptionsProps = {
  name: string;
  defaultValue: string;
  options: {
    label: string;
    value: string;
  }[];
  label: string;
};

type SelectOptionsProps = {
  group: OptionsProps[];
};

const SelectOptions = ({ group }: SelectOptionsProps) => {
  return (
    <div className="text-gray-800 italic">
      <Input
        type="number"
        name="size"
        placeholder="Minimum Size in sq.ft"
        onlyPlaceholder="0"
        className="border border-gray-400 px-3 h-9 flex justify-center items-center rounded-md bg-white "
      />
      {group.map((select, index) => (
        <div className="flex flex-col mt-3 max-w-[200px] italic" key={index}>
          <label className=" mb-1" htmlFor={select.name}>
            {select.label}
          </label>
          <Options
            defaultValue={select.defaultValue}
            name={select.name}
            options={select.options}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectOptions;
