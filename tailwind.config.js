/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainDarkTheme: "#1f2432",
        accentDarkTheme: "#242837",
        sideBarPurple: "#3d384e",
        navBarWhite: "#ffffff",
        backgroundWhite: "#efeff0",
        buttonPurple: "#b4b7ee",
      },
    },
  },
  plugins: [],
};
