const SumoLogger = require('sumo-logger');

const streamMetricsToSumo = (opts, metrics, err) => {
  if (err) {
    console.log('Error on Rx: ', err);
  } else {
    const sumoLogger = new SumoLogger(opts);
    sumoLogger.log(metrics)
  }
}

module.exports = {streamMetricsToSumo}
