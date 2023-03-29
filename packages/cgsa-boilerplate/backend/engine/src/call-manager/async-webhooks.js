const job = require('../queue/job');

module.exports = (callbacks, payload) => {
  for (const callback of callbacks) {
    job.push({
      type: 'webhook',
      value: callback.value,
      data: { ...payload }
    });
  }
};
