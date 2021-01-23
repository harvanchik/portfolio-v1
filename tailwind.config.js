const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    mode: 'layers',
    content: ['/public/**/*.html', '/assets/html/*.html', '/assets/js/*.js']
  },
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
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
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem'
      }
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['dark'],
    },
  },
  plugins: [],
  extends: ['stylelint-config-recommended']
};
