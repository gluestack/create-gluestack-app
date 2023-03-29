/**
 * This function is the entry point for the gluestack actions.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *
 * @returns {Promise<void>}
 */
const { DaprClient, HttpMethod } = require('@dapr/dapr');

module.exports = async (req, res) => {
  if (!req.params || !req.params.action_name) {
    return res.status(500).json({
      status: false,
      message: '"action" is missing from request param'
    });
  }

  const { headers, body } = req;
  if (headers["content-length"]) delete headers["content-length"];

  const daprHost = '127.0.0.1';
  const daprPort = 3500;

  const client = new DaprClient(daprHost, daprPort);

  const serviceAppId = req.params.action_name;
  const serviceMethod = body.action.name;

  try {
    const data = await client.invoker.invoke(
      serviceAppId,
      serviceMethod,
      HttpMethod.POST,
      { ...body },
      { headers }
    );
    return res.status(200).json(data);
  } catch (err) {
    console.log(`Error invoking action ${serviceAppId}::${serviceMethod}: ${err}`);
    return res.status(500).json({
      status: false,
      ...e.message
    });
  }
};
