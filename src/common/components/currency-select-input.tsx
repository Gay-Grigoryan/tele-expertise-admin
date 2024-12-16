"use client";
import React, { useRef, useState } from "react";
import SelectInput, { SelectInputProps } from "./select-input";
import { Currencies, Language } from "../types/enums";
import axios from "axios";

interface Props extends Omit<SelectInputProps, "onChange" | "value" | "onEndIconChange" | "options" | "selectedOption"> {
  onChange: (lang: Language, value: string) => void;
  value: Record<Language, string>;
}

const currencies = [
  { value: Language.hy, label: "֏" },
  { value: Language.ru, label: "₽" },
  { value: Language.en, label: "$" },
  { value: Language["zh-CN"], label: "¥" }
];

export default function CurrenciesSelectInput({ onChange, value, ...props }: Props) {
  const [selectedCurrency, setSelectedCurrency] = useState(Language.hy);
  const currenciesRef = useRef({ [Currencies.USD]: 0, [Currencies.CNY]: 0, [Currencies.RUB]: 0 });

  const updateCurrencies = async () => {
    if (Object.values(currenciesRef.current).some(el => el === 0)) {
      const { data } = await axios.get("https://cb.am/latest.json.php");
      currenciesRef.current = { CNY: +data.CNY, RUB: +data.RUB, USD: +data.USD };
    }
    onChange(Language.en, `${Math.ceil(+value.hy / currenciesRef.current.USD)}`);
    onChange(Language.ru, `${Math.ceil(+value.hy / currenciesRef.current.RUB)}`);
    onChange(Language["zh-CN"], `${Math.ceil(+value.hy / currenciesRef.current.CNY)}`);
  };

  return (
    <SelectInput
      onEndIconChange={setSelectedCurrency as React.Dispatch<React.SetStateAction<string>>}
      options={currencies}
      selectedOption={selectedCurrency}
      endIcons={<EndIcon label={currencies.find(el => el.value === selectedCurrency)!.label} />}
      onChange={e => onChange(selectedCurrency, e.target.value)}
      value={value[selectedCurrency]}
      type="number"
      readOnly={selectedCurrency != Language.hy}
      onBlur={updateCurrencies}
      {...props}
    />
  );
}

const EndIcon = ({ label }: { label: string }) => {
  return (
    <div className="cursor-pointer border-l border-r-gray-medium pl-2">
      <p className="font-regular text-l5 text-black">{label}</p>
    </div>
  );
};
