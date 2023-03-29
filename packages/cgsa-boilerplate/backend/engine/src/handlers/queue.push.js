/**
 * This function is the entry point for the gluestack queue push.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *
 * @returns {Promise<void>}
 */
const job = require('../queue/job');

module.exports = async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('value')) {
    return res
      .status(404)
      .json({
        status: false,
        message: 'Invalid request. Requires "value" & "data" (as '
          + 'optional json data for your payload) indexes. '
          + 'Missing "value" ie. function name'
      });
  }

  // pushes the job into the queue
  job.push({
    type: 'function',
    value: body.value,
    data: body.hasOwnProperty('data') ? body.data : {}
  });

  return res.status(200).json({
    status: true,
    message: 'OK'
  });
};
