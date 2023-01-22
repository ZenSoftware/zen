module.exports = {
  singleQuote: true,
  printWidth: 100,
  arrowParens: 'avoid',
  // Fix for plugins not working with pnpm https://github.com/trivago/prettier-plugin-sort-imports/issues/51
  plugins: [require.resolve('prettier-plugin-import-sort')],
};
