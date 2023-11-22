/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        // Fade up and down
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      colors: {
        brand: {
          primary: {
            300: "#B2B284",
            400: "#8A8A66",
            500: "#616148",
            600: "#38382A",
            700: "#2B2B20"
          },
          secondary: {
            300: "#DEDCA4",
            400: "#B5B486",
            500: "#8B8A67",
            600: "#63634A",
            700: "#3B3A2B"
          }
        },
        feedback: {
          success: {
            300: "#6EF0BE",
            400: "#37E69B",
            500: "#14D264",
            600: "#00A55A",
            700: "#007341"
          },
          info: {
            300: "#7AA6FF",
            400: "#528AFF",
            500: "#366DDE",
            600: "#2C59B5",
            700: "#22458C"
          },
          warning: {
            300: "#FFC952",
            400: "#FCBB28",
            500: "#E9A100",
            600: "#BF8400",
            700: "#966800"
          },
          danger: {
            300: "#FFBEC3",
            400: "#FF7D82",
            500: "#FF3746",
            600: "#D22D37",
            700: "#A52328"
          },
          active_default: {
            300: "#2447BF",
            400: "#183082",
            500: "#0D1A46",
            600: "#050A1C",
            700: "#010308"
          },
          active_optional: {
            300: "#75AFFF",
            400: "#6EA5F0",
            500: "#5B88C6",
            600: "#496D9E",
            700: "#365175"
          },
          rank: {
            red: "#FF545B",
            yellow: "#FFE545",
            green: "#0DA560"
          }
        },
        highlight: {
          '01': {
            300: "#E1EB78",
            400: "#C8E13C",
            500: "#AFD700",
            600: "#82A500",
            700: "#5A6E00"
          },
          '02': {
            300: "#78DCDC",
            400: "#3CC8C8",
            500: "#00AFAF",
            600: "#00877D",
            700: "#004646"
          },
          '03': {
            300: "#AAFAFF",
            400: "#55EBF5",
            500: "#00D2E6",
            600: "#00AAB9",
            700: "#006482"
          },
          '04': {
            300: "#CDCDFF",
            400: "#9B8CFF",
            500: "#6446FF",
            600: "#503CCD",
            700: "#3C2D9B"
          }
        },
        neutral: {
          gray: {
            900: "#171717",
            800: "#303030",
            700: "#4D4D4D",
            600: "#696969",
            500: "#858585",
            400: "#9E9E9E",
            300: "#BABABA",
            200: "#D4D4D4",
            100: "#EDEDED",
            50: "#F7F7F7"
          },
          bege: {
            900: "#CFD1C9",
            800: "#D4D6CE",
            700: "#D9DBD3",
            600: "#DEE0D7",
            500: "#E3E5DC",
            400: "#EAEBE8",
            300: "#EFF0ED",
            200: "#F4F5F2",
            100: "#F8F9F7",
            50: "#FDFFFC"
          },
          black_white: {
            black: "#000014",
            white: "#FFFFFF"
          }
        }
      },
      fontSize: {
        'theme-nano': "0.625rem",
        'theme-xxxs': "0.75rem",
        'theme-xxs': "0.875rem",
        'theme-xs': "1rem",
        'theme-sm': "1.125rem",
        'theme-md': "1.25rem",
        'theme-lg': "1.375rem",
        'theme-xl': "1.5rem",
        'theme-xxl': "1.75rem",
        'theme-xxxl': "2rem",
        'theme-display': "2.5rem",
        'theme-huge': "3rem",
        'theme-giant': "4rem",
        'theme-giga': "5rem"
      },
      backgroundImage: {
        auth: "url('/assets/img/bg-auth.jpg')"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
  ],
};
