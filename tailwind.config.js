module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sidebar: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        small: "0px 0px 7px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        darkblue: "#0c2c4c",
        acuBaseBlue: "#092c4c",
        acuGreen: '#A7D02A'
      },
      scrollbarHide: {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
