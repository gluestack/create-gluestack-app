module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react',
  typescript: {
    reactDocgen: 'none',
  },

  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      use: 'babel-loader',
    });

    return config;
  },
};
