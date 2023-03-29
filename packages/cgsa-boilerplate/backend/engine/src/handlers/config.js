/**
 * This function is the entry point for the gluestack config.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *
 * @returns {Promise<void>}
 */
const { readFileSync } = require('node:fs');

module.exports = (req, res) => {
  const content = readFileSync('./config.json');
  try {
    return res.status(200).json({status: true, data: JSON.parse(content)});
  } catch (e) {
    return res.status(200).json({status: false, data: {}});
  }
};
