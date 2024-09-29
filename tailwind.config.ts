import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        creamWhite: '#f3f6e7',
        darkGreen: '#005942',
        lightGreen: '#8fc43d',
        persianGreen: '#00aaab',
        myBlack:'#333132',
        myLightGray:'#f2f2f2',
      },
    },
  },
  plugins: [],
};
export default config;
