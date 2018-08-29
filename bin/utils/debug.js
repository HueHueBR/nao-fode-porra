const DEBUG_MODE = true;

module.exports = (message) => {
  const now = new Date();

  console.debug(`[DEBUG] [${now}] ${message}`);
};

