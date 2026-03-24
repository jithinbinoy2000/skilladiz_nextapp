/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/**/*.css"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
        accent: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        "paragraph-gray": "#9b9b9b",
        pink: "#f833e1",
        "primary-dark": "#0e0e0e",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
        },
      },
      fontSize: {
        hero: ["80px", { lineHeight: "1.1" }],
        "hero-sm": ["56px", { lineHeight: "1.1" }],
        h2: ["50px", { lineHeight: "1.2" }],
        h3: ["35px", { lineHeight: "1.2" }],
        h4: ["28px", { lineHeight: "1.2" }],
        h5: ["24px", { lineHeight: "1.2" }],
      },
      letterSpacing: {
        wide: "0.12em",
        wider: "0.25em",
      },
    },
  },
  plugins: [],
};
