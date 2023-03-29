/**
 * This function is the entry point for the gluestack db events.
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
  const { event, table } = req.body;
  const { name: tableName } = table;
  const { session_variables, op , data } = event;

  try {
    const content = await readFile('./config.json');
    const config = JSON.parse(content);
    const database = get(config, 'database', {});

    const callbacks = database[tableName][op.toLowerCase()];
    if (! callbacks) {
      return res.status(404).json({ status: false, message: 'event not found' });
    }

    await callManager(callbacks, { session_variables, data });

    return res.status(200).json({
      status: true,
      message: 'Ok'
    });
  } catch (e) {
    console.log('> Error:', e);
    return res.status(404).json({ status: false, message: 'Config JSON file not found' });
  }
};
