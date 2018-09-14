const SumoLogger = require('sumo-logger');

const streamMetricsToSumo = (opts, metrics, context, err) => {
  if (err) {
    context.log('Error on Rx: ', err);
  } else {
    (opts.sessionKey == "" || opts.sourceCategory == "" || opts.sourceName == "") ?
    metrics.forEach(metric => {
      sendAsMetric(metric,opts);
    })
    : sendAsLog(metrics,opts);
  }
};

const sendAsMetric = (metric, opts) => {
  if (opts.rockendService == null || opts.azureService == null) {
    throw "The variables of rockendService and azureService can not be undefined when sending metrics. Please check your queryconfig.js";
  }
  opts.graphite = true ;
  const sumoLogger = new SumoLogger(opts);
  Object.keys(metric).forEach(key => {
    if(key != "timestamp") {
      sumoLogger.log({
        path: `${opts.rockendService}_${opts.azureService}_${key}`,
        value: metric[key].toString()
      })
    }
  })
}

const sendAsLog = (metrics, opts) => {
  const sumoLogger = new SumoLogger(opts);
  sumoLogger.log(metrics);
}

module.exports = {streamMetricsToSumo}
