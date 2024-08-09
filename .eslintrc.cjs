module.exports = {
  extends: ['mantine', 'next/core-web-vitals'],
  plugins: ['testing-library'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'semi': [2, 'never'],
  },
};