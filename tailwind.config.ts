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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        cards: "var(--cards)",
        navbar: "var(--navbar)",
        theme: "var(--theme)"
      },
      backgroundImage: {
        'hero': "url('/people.jpg')",
      }
    },
  },
  plugins: [],
} satisfies Config;
