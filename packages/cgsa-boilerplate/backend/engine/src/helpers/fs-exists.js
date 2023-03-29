const { accessSync, constants } = require('node:fs');

module.exports = (filepath) => {
  try {
    accessSync(filepath, constants.R_OK | constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
};
