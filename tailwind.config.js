const path = require("path");

module.exports = {
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        "adorn-condensed-sans": ["Adorn Condensed Sans", "sans-serif"],
        "futura-pt": ["Futura PT", "sans-serif"],
      },
      fontSize: {
        "4.5xl": "2.625rem",
        "6.5xl": "4.125rem"
      },
      colors: {
        white: "#ffffff",
        raisinBlack: "#242323",
        lavenderBlush: "#FDF5F4",
        mistyRose: "#FDE0DC",
        ripeMango: "#FFD11F"
      }
    },
  },

  plugins: [],
  content: [
    path.resolve(__dirname, "./src/**/*.{js,vue}"),
    path.resolve(__dirname, "./shopify/**/*.liquid"),
  ],
};
