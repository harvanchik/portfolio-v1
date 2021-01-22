const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    mode: 'layers',
    content: ['/public/**/*.html', '/assets/html/*.html', '/assets/js/*.js']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ["'Quicksand'", 'sans-serif'],
        'lobster': ["'Lobster'", 'cursive'],
        'grandstander': ["'Grandstander'", 'san-serif']
      },
      colors: {
        gray: colors.trueGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
