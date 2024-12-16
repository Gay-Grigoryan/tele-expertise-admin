import type { Config } from "tailwindcss";

export const blackTitle = "#101920";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      backgroundColor: {
        "gradient-primary": "#51BBBF"
      },
      colors: {
        primary: {
          DEFAULT: "#00E7A2"
        },
        gray: {
          dark: "#A5A5A5",
          medium: "#DDDDDD",
          light: "#FAFAFA"
        },
        black: {
          DEFAULT: blackTitle,
          dark: "#00050C",
          medium: "#101920",
          light: "#101920",
          lighter: "#101920"
        },
        accent: {
          DEFAULT: "#65C478",
          50: "#E9F7EA",
          100: "#BCE8C1",
          200: "#91D69B",
          300: "#65C478",
          400: "#009C3F"
        },
        red: {
          DEFAULT: "#F04438"
        },
        orange: {
          DEFAULT: "#F8981D"
        },
        yellow: {
          DEFAULT: "#75E200"
        }
      },
      fontFamily: {
        regular: ["MontserratarmRegular"],
        medium: ["MontserratarmMedium"],
        bold: ["MontserratarmBold"]
      },
      fontSize: {
        h1: ["20px", { lineHeight: "24px", fontWeight: 500 }],
        h2: ["18px", { lineHeight: "19.6px", fontWeight: 500 }],
        h3: ["16px", { lineHeight: "20.8px", fontWeight: 500 }],
        h4: ["14px", { lineHeight: "18.2px", fontWeight: 500 }],
        h5: ["13px", { lineHeight: "16.9px", fontWeight: 500 }],
        h6: ["60px", { lineHeight: "72px", fontWeight: 700 }],
        p1: ["14px", { lineHeight: "22.4px", fontWeight: 400 }],
        p2: ["13px", { lineHeight: "18.2px", fontWeight: 400 }],
        p3: ["12px", { lineHeight: "15.6px", fontWeight: 400 }],
        p4: ["10px", { lineHeight: "12px", fontWeight: 400 }],
        p5: ["8px", { lineHeight: "10.4px", fontWeight: 400 }],
        l1: ["14px", { lineHeight: "18.2px", fontWeight: 400 }],
        l2: ["14px", { lineHeight: "16.1px", fontWeight: 500 }],
        l3: ["13px", { lineHeight: "15.6px", fontWeight: 500 }],
        l4: ["13px", { lineHeight: "15.6px", fontWeight: 400 }],
        l5: ["12px", { lineHeight: "14.4px", fontWeight: 400 }]
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px"
      },
      boxShadow: {
        s1: "0px 100px 28px rgba(16, 25, 32, 0)",
        s2: "0px 64px 26px rgba(16, 25, 32, 0)",
        s3: "0px 36px 22px rgba(16, 25, 32, 0.01)",
        s4: "0px 16px 16px rgba(16, 25, 32, 0.02)",
        s5: "0px 4px 9px rgba(16, 25, 32, 0.02)"
      }
    }
  },
  plugins: [],
  darkMode: "class"
};
export default config;
