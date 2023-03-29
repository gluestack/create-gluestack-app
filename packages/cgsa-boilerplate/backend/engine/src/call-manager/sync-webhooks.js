const axios = require('axios').default;

module.exports = async (callbacks, payload) => {
  for await (const callback of callbacks) {
    const { value } = callback;

    await axios({
      method: 'post',
      url: value,
      data: { ...payload }
    });
  }
};
