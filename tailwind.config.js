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
        backgroundWhite: "#eeeeee",
        buttonPurple: "#524d63",
        accentButtonGrey: "#6b7280",
      },
      variants: {
        opacity: ({ after }) => after(["disabled"]),
      },
    },
  },
  plugins: [],
};
