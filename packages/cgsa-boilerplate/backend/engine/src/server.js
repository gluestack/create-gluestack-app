const express = require('express');
const bodyParser = require('body-parser');

const cronTab = require('./cron');
const job = require('./queue/job');

const config = require('./handlers/config');
const actions = require('./handlers/actions');
const dbEvents = require('./handlers/events.db');
const appEvents = require('./handlers/events.app');
const queuePush = require('./handlers/queue.push');
const invokeClient = require('./handlers/invoke.client');
const invokeServer = require('./handlers/invoke.server');

const app = express();
const port = 9000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Engine health-check route
app.get('/health-check',
  (_req, res) =>
    res
      .status(200)
      .json({ status: true, message: 'Ok' })
  );

// Engine action route
app.post('/actions/:action_name', actions);

// Engine db events route
app.post('/events', dbEvents);

// Engine app events route
app.post('/app/events', appEvents);

// Engine Client SDK's Invoke route
app.post('/client/invoke', invokeClient);

// Engine Server SDK's Invoke route
app.post('/server/invoke', invokeServer);

// Engine Config
app.get('/glue/config', config);

// Engine queue job push route
app.post('/queue/push', queuePush);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: 'Something broke!',
    stack: err.stack
  });
});

// Engine Queue
job.init();

// Engine server
app.listen(port, () => {
  console.log(`Engine app listening on port ${port}`)
});

// Engine CRON
cronTab.init();
