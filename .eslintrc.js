module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'object-curly-newline': 0,
    'no-undef': 0,
    // 'arrow-parens': 0,
    // 'arrow-body-style': 0,
    // 'import/extensions': 'off',
    // 'import/no-unresolved': 'off',
  },
  globals: {
    document: 1,
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: 1,
  },
};
