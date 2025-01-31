"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const Options = ({
  name,
  options,
}: {
  name: string;
  options: { label: string; value: string }[];
}) => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get(name);

  const selectedOption = options.find((option) => option.value === searchParam);

  const [value, setValue] = useState<{ label: string; value: string } | undefined>(
    selectedOption || options[0]
  );

  useEffect(() => {
    if (searchParam && selectedOption) {
      setValue(selectedOption);
    } else {
      setValue(options[0]);
    }
  }, [searchParam, selectedOption]);

  const handleChange = (selected: { label: string; value: string } | null) => {
    setValue(selected || options[0]);

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
