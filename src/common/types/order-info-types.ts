import { StoneTypes } from "./enums";

export const translations: Record<string, Record<string, string>> = {
  stoneTypes: {
    [StoneTypes.travertine]: "Տրավերտին",
    [StoneTypes.basalt]: "Բազալտ",
    [StoneTypes.tuff]: "Տուֆ",
    [StoneTypes.felsite]: "Ֆելզիտ",
    [StoneTypes.granite]: "Գրանիտ"
  },
  processingTypes: {
    sliced: "Կտրած (խամ)",
    flattened: "Հարթեցված",
    antique: "Հնեցված (անտիկ)",
    semi_gloss: "Կիսափայլ",
    gloss: "Փայլեցված",
    shub: "Շուբ",
    brushatka: "Բրուշատկա"
  },
  thicknessTypes: {
    fifteen: "15 մմ",
    twenty: "20 մմ",
    thirty: "30 մմ"
  },
  widthTypes: {
    three_hundred: "300 մմ",
    four_hundred: "400 մմ"
  },
  "stone-unit": {
    meter_square: "մ/ք",
    meter_cube: "մ/խ",
    pcs: "հատ",
    picometr: "գծամետր"
  },
  lengthTypes: {
    four_hundred: "400 մմ",
    six_hundred: "600 մմ",
    eight_hundred: "800 մմ",
    one_thousand_two_hundred: "1200 մմ"
  }
};

export default function getOrderInfoTypeByKey(section: string, key: string) {
  try {
    return translations[section][key];
  } catch (e) {
    return "_there_is_no_translation";
  }
}
