module.exports = () => {
  return [
    {
      "server_name": "api"
    },
    {
      "path": "/backend/engine/(.*)",
      "proxy": {
        "instance": "engine:3500",
        "path": "/v1.0/invoke/engine/method/$1"
      }
    }
  ];
};
