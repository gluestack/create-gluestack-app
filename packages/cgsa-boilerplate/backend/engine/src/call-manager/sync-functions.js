const { DaprClient, HttpMethod } = require('@dapr/dapr');

module.exports = async (callbacks, payload) => {

  console.log({callbacks, payload});

  const daprPort = 3500;
  const daprHost = '127.0.0.1';

  const client = new DaprClient(daprHost, daprPort);

  for await (const callback of callbacks) {
    const { value } = callback;

    const [ serviceAppId, serviceMethod ] = value.split('::');
    if (!serviceAppId || !serviceMethod) {
      console.log(`Missing service app id or method from ${value}`);
      continue;
    }

    try {
      await client.invoker.invoke(
        serviceAppId.replace(/-/g, ''),
        serviceMethod,
        HttpMethod.POST,
        { ...payload },
        {}
      );
    } catch (err) {
      console.log(`Error invoking ${serviceAppId}::${serviceMethod}: ${err}`);
      continue;
    }
  }
};
