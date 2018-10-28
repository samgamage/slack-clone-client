module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 0,
    'arrow-parens': 0,
    'react/destructuring-assignment': 0,
    'object-curly-newline': 0,
    'arrow-body-style': 0,
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-undef': 0,
  },
  globals: {
    document: 1,
  },
  env: {
    es6: true,
  },
};
