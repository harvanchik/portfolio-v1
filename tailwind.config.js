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
        'grandstander': ["'Grandstander'", 'san-serif'],
        'acme': ["'Acme'", 'san-serif']
      },
      colors: {
        gray: colors.trueGray,
        cyan: colors.cyan,
        teal: colors.teal,
        lightblue: colors.lightBlue,
        blue: {
          950: '#091129'
        }
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        98: '25rem',
        100: '26rem',
        102: '27rem',
        104: '28rem',
      },
      fontSize: {
        '0.5xl': '1.155rem',
        '1.5xl': '1.375rem',
        '4.5xl': '2.625rem'
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
