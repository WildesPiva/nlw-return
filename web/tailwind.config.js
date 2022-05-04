module.exports = {
  content: ["./src/**/*.{tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          300: "#996DFF",
          500: "#8257E6",
        },
        background: {
          500: "#09090A",
        },
        text: {
          500: "text-zinc-100",
        },
      },
      borderRadius: {
        md: "0.25rem", // 4px
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
