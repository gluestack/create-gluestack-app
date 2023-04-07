module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react",
  typescript: {
    reactDocgen: "none",
  },

  staticDirs: ["../public"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      use: "babel-loader",
    });

    return config;
  },
};

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async (config) => {
    // Add MUI loader to Webpack config
    config.module.rules.push({
      test: /\.mui\.(j|t)sx?$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        {
          loader: "@mui/system/loader",
          options: {
            muiTreeshake: true,
            muiDir: "@mui/material",
          },
        },
      ],
    });

    return config;
  },
};

const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react",
  typescript: {
    reactDocgen: "none",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      include: [
        path.resolve("../../", "node_modules/@legendapp/motion"),
        path.resolve("../", "node_modules/@gluestack-ui"),
        path.resolve("../", "node_modules/@dank-style"),
      ],
      use: "babel-loader",
    });
    return config;
  },
};
