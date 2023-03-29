const cron = require('node-cron');

const syncCallsWebhooks = require('./call-manager/sync-webhooks');
const syncCallsFunctions = require('./call-manager/sync-functions');

// Initialises the crontab instance
const cronTab = {};

// Initialises the crontab with the schedules
// available in config.json file
cronTab.init = () => {
  try {
    const content = require('../config.json');
    if (!content || !content.hasOwnProperty('crons')) {
      console.log('[engine] No crons in config.json file!');
      return Promise.resolve('[engine] No crons in config.json file!');
    }

    console.log(`[engine] Scheduling ${content.crons.length} crons...`);

    // Schedules all the cron tasks
    content
      .crons
      .forEach(
        async cronItem =>
          cronTab.scheduleTask(cronItem)
      );

  } catch (error) {
    console.log('[engine] Something went wrong while reading the config.json file. Please check and try again!');
  }
};

// Schedules a cron task
cronTab.scheduleTask = async ({ schedule, type, value }) => {
  if (!schedule || !type || !value) {
    console.log('[engine] Invalid cron item!', { schedule, type, value });
    return false;
  }

  console.log(`[engine] Scheduling "${type.toUpperCase()}":`, value);

  cron.schedule(schedule, async () => {
    if (type === 'webhook') {
      await syncCallsWebhooks([{ type, value }]);
    }

    if (type === 'function') {
      await syncCallsFunctions([{ type, value }]);
    }
  });
};

module.exports = cronTab;
