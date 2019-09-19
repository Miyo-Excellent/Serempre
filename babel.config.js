module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['optional-require'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
