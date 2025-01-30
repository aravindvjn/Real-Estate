"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const Options = ({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: { label: string; value: string }[];
  defaultValue: string;
}) => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get(name);

  const selectedOption = options.find((option) => option.value === searchParam);

  const [value, setValue] = useState<{ label: string; value: string } | undefined>(
    selectedOption || { label: defaultValue, value: "" }
  );

  useEffect(() => {
    if (searchParam && selectedOption) {
      setValue(selectedOption);
    } else {
      setValue({ label: defaultValue, value: "" });
    }
  }, [searchParam, selectedOption, defaultValue]);

  const handleChange = (selected: { label: string; value: string } | null) => {
    setValue(selected || { label: defaultValue, value: "" });

  };

  return (
    <div>
      <Select
        name={name}
        options={options}
        value={value}
        className="max-w-[200px] rounded"
        onChange={handleChange}
      />
    </div>
  );
};

export default Options;
