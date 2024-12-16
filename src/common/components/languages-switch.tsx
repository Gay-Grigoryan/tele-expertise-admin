import React from "react";
import { Language } from "../types/enums";

interface Props {
  selectedLang: Language;
  onSelectedLangChange: (value: Language) => void;
}
const languages = [
  { text: "Հայերեն", value: Language.hy },
  { text: "Русский", value: Language.ru },
  { text: "English", value: Language.en },
  { text: "中國人", value: Language["zh-CN"] }
];

export default function LanguagesSwitch({ selectedLang, onSelectedLangChange }: Props) {
  return (
    <div className="flex gap-2 border-b border-gray-medium pb-4">
      {languages.map(lang => {
        const selected = lang.value === selectedLang;
        return (
          <div
            key={lang.value}
            className={`cursor-pointer rounded-lg px-4 py-2 ${
              selected ? "bg-black" : "border-b border-gray-light bg-gray-light"
            }`}
            onClick={() => onSelectedLangChange(lang.value)}
          >
            <p className={`font-regular text-p2 ${selected ? "text-white" : "text-black"}`}>{lang.text}</p>
          </div>
        );
      })}
    </div>
  );
}
