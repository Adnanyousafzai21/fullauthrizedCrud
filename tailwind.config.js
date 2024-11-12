/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: "#FCEDE8",
        secondrayColor: "#E4421B",
        bgColor1: "black",
        textcolor1: "white",
        bgColor2: "white",
        textColor2: "black"
      },
    },
  },
  plugins: [],
};
