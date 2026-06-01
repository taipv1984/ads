module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],

    // Important: use the scoped @babel/* plugin names.
    // Unscoped `babel-plugin-...` plugins may not exist in your dependency tree.
    plugins: [
      '@babel/plugin-transform-private-methods',
      '@babel/plugin-transform-private-property-in-object',
    ],
  };
};

