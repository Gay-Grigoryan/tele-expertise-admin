"use client";
import React, { useState } from "react";
import SelectInput, { SelectInputProps } from "./select-input";
import { Language } from "../types/enums";
import Icon from "./icon";

interface Props extends Omit<SelectInputProps, "onChange" | "value" | "onEndIconChange" | "options" | "selectedOption"> {
  value: Record<Language, string>;
}

const languages = [
  { value: Language.hy, label: "Հայերեն" },
  { value: Language.ru, label: "Русский" },
  { value: Language.en, label: "English" },
  { value: Language["zh-CN"], label: "中國人" }
];

export default function LanguagesSelectInput({ value, ...props }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState("hy");

  return (
    <SelectInput
      onEndIconChange={setSelectedLanguage}
      options={languages}
      selectedOption={selectedLanguage}
      readOnly
      endIcons={
        <div className="cursor-pointer">
          <Icon name={selectedLanguage} size={16} />
        </div>
      }
      value={value[selectedLanguage as Language]}
      {...props}
    />
  );
}
