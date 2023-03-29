/**
 * This function is the entry point for the gluestack app events.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *
 * @returns {Promise<void>}
 */
const { get } = require('lodash');
const callManager = require('../call-manager');
const { readFile } = require('node:fs/promises');

module.exports = async (req, res) => {
  const { body } = req;
  if (!body.event_name || body.event_name === '') {
    return res.status(404).json({ status: false, message: `'event_name' is missing from the body!` });
  }

  const data = get(body, 'data', {});
  const event_name = get(body, 'event_name');

  try {
    const content = await readFile('./config.json');
    const config = JSON.parse(content);
    const app = get(config, 'app', {});

    const callbacks = app[event_name];
    if (! callbacks) {
      return res.status(404).json({ status: false, message: `"${event_name}" event name not found` });
    }

    await callManager(callbacks, { event_name, data });

    return res.status(200).json({
      status: true,
      message: 'Ok'
    });
  } catch (e) {
    console.log('> Error:', e);
    return res.status(404).json({ status: false, message: 'Config JSON file not found' });
  }
};
