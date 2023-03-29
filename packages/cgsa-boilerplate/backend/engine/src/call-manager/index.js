const syncCallsWebhooks = require('./sync-webhooks');
const syncCallsFunctions = require('./sync-functions');
const asyncCallsWebhooks = require('./async-webhooks');
const asyncCallsFunctions = require('./async-functions');

module.exports = async (callbacks, payload) => {
  const syncCalls = {
    function: [],
    webhook: []
  };

  const asyncCalls = {
    function: [],
    webhook: []
  };

  for await (const callback of callbacks) {
    const { kind, type, value } = callback;

    if (kind === 'sync' && type === 'function') {
      syncCalls.function.push({ type, value });
    }

    if (kind === 'sync' && type === 'webhook') {
      syncCalls.webhook.push({ type, value });
    }

    if (kind === 'async' && type === 'function') {
      asyncCalls.function.push({ type, value });
    }

    if (kind === 'async' && type === 'webhook') {
      asyncCalls.webhook.push({ type, value });
    }
  }

  if (syncCalls.webhook.length) {
    await syncCallsWebhooks(syncCalls.webhook, payload);
  }

  if (syncCalls.function.length) {
    await syncCallsFunctions(syncCalls.function, payload);
  }

  if (asyncCalls.webhook.length) {
    asyncCallsWebhooks(asyncCalls.webhook, payload);
  }

  if (asyncCalls.function.length) {
    asyncCallsFunctions(asyncCalls.function, payload);
  }
};