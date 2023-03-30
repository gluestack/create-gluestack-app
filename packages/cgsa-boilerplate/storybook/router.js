/**
 * This file is treated as the upstream in the nginx configuration.
 *
 * path: The path to match on
 * proxy: The proxy configuration
 * proxy.path: The path to match on the proxied configuration
 * size_in_mb: The maximum size of the request body in megabytes, default is 50 mb
 *
 * @returns {Array} Array of locations
 */
module.exports = () => [
  {
    server_name: "storybook"
  },
  {
    path: '/(.*)',
    proxy: {
      path: '/$1',
      instance: "storybook:9000",
    },
    size_in_mb: '50',
  },
];
