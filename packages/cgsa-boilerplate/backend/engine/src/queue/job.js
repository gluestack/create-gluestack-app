const Queue = require('./queue').Queue;

const { join } = require('path');
const { mkdirSync } = require('fs');
const fsExists = require('../helpers/fs-exists');
const syncCallsWebhooks = require('../call-manager/sync-webhooks');
const syncCallsFunctions = require('../call-manager/sync-functions');

const job = {};

// runs the job
job.runner = (queue) => {
  /**
   * Transaction popping
   *
   * A transactional pop means, that the element is taken from the
   * queue, but will not be removed until commit is called. The rollback
   * action makes the item again available for popping.
   *
   * There can be multiple layers of transactions. Since transactional
   * pops (tpops) don't block the popping in general, there can be
   * multiple inside of each other. The downside is that it can't be
   * assured that the messages are processed in order.
   */

  queue.tpop((err, message, commit, _rollback) => {
    if (err) {
      throw err;
    }

    if (
      message
        && message.hasOwnProperty('type')
        && message.hasOwnProperty('value')
    ) {
      const { type, value } = message;
      const data = message.hasOwnProperty('data')
        ? message.data : {};

      if (type === 'webhook') {
        syncCallsWebhooks([{ type, value }], data);
      }

      if (type === 'function') {
        syncCallsFunctions([{ type, value }], data);
      }
    }

    // commits the transaction
    commit((err) => {
      if (err) {
        throw err;
      }

      job.runner(queue);
    });
  });
};

// initialises the queue
job.init = () => {
  const filePath = join(__dirname, './../..', '.queue');
  if (!fsExists(filePath)) {
    mkdirSync(filePath);
  }

  job.worker = new Queue('.queue', (err) => {
    job.runner(job.worker);
  });
};

/**
 * Kind: "function" or "webhook"
 * Value: function's name or webhook url
 * Data: JSON Data
 */
job.push = ({ type, value, data }) => {
  job.worker.push({ type, value, data }, (err) => {
    if (err) {
      console.log('[job::push]', err);
    }
  });
};

module.exports = job;
