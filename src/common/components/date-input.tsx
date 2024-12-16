"use client";
import React, { useEffect, useState } from "react";
import Icon from "./icon";
import Datepicker, { DatepickerType, DateValueType } from "react-tailwindcss-datepicker";

interface Props extends Omit<DatepickerType, "value" | "onChange"> {
  placeholder: string;
  value?: Date;
  onChange: (value: Date) => void;
}

export default function DateInput({ placeholder, value, onChange, ...props }: Props) {
  const [date, setDate] = useState<DateValueType>({ endDate: value || null, startDate: value || null });
  const handleValueChange = (newValue: DateValueType) => {
    setDate(newValue);
    if (newValue?.startDate) {
      onChange(new Date(newValue.startDate));
    }
  };

  useEffect(() => {
    if (value) setDate({ endDate: value, startDate: value });
  }, [value]);

  return (
    <div>
      <Datepicker
        primaryColor="emerald"
        classNames={{ container: () => "!bg-white" }}
        useRange={false}
        i18n="hy"
        placeholder={placeholder}
        displayFormat="DD.MM.YYYY"
        toggleIcon={() => <Icon name="calendar" size={16} />}
        asSingle
        inputClassName="bg-white h-[41px] w-full rounded-lg border border-gray-dark px-3 py-[10px] font-regular text-p1 text-black outline-none placeholder:text-gray-medium pr-10"
        value={date}
        onChange={handleValueChange}
        {...props}
      />
    </div>
  );
}
