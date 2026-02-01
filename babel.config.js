/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['hot-updater/babel-plugin'],
      'react-native-worklets/plugin', // deve ser o último plugin
    ],
  };
};
