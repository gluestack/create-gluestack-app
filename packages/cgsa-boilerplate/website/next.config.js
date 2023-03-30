/** @type {import('next').NextConfig} */

const { withGluestackUI } = require("@gluestack/ui-next-adapter");

const nextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  reactStrictMode: true,
  transpilePackages: ["@project/components"],
};

module.exports = withGluestackUI(nextConfig);
