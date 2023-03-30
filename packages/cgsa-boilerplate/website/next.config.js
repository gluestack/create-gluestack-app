/** @type {import('next').NextConfig} */

// const withPlugins = require("next-compose-plugins");
// const withTM = require("next-transpile-modules")([
//   "react-native-web",
//   "@project/components"
// ]);
const { withGluestackUI } = require("@gluestack/ui-next-adapter");

const nextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  reactStrictMode: true,
  // // webpack5: true,
  // webpack: (config, { isServer }) => {
  //   config.resolve.fallback = {
  //     fs: false
  //   };

  //   config.resolve.alias = {
  //     ...(config.resolve.alias || {}),
  //     // Transform all direct `react-native` imports to `react-native-web`
  //     "react-native$": "react-native-web",
  //   };

  //   return config;
  // },
};

module.exports = withGluestackUI(nextConfig);
