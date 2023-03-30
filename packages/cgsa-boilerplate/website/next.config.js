/** @type {import('next').NextConfig} */

const { withGluestackUI } = require("@gluestack/ui-next-adapter");

const nextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  reactStrictMode: true
};

module.exports = withGluestackUI(nextConfig);
