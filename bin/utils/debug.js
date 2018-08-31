const DEBUG_MODE = false;

module.exports = (message) => {
  if (!DEBUG_MODE) {
    return;
  }
  const now = new Date();

  console.debug(`[DEBUG] [${now}] ${message}`);
};

