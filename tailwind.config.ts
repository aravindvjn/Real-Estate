import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'white-0': "var(--white-0)",
        'white-1': "var(--white-1)",
        foreground: "var(--foreground)",
        'green-1': "var(--green-1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
