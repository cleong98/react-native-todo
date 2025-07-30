module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root: ['./app'],
        extension: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@navigation': './app/navigation',
          '@hook': './app/hook',
          '@features': './app/features',
          '@app': './app',
          '@components': './app/components'
        }
      }
    ]
  ]
};
