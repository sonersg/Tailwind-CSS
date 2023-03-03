/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancingScript: ['"Dancing Script"', "cursive"],
        poppins: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

// font-family: 'Dancing Script', cursive;
// font-family: 'Kumbh Sans', sans-serif;
// font-family: 'Pacifico', cursive;
// font-family: 'Poppins', sans-serif;
// font-family: 'Rowdies', cursive;
// font-family: 'Rubik Gemstones', cursive;
