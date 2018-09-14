const MetricsProcessor = require('./metricsProcessor');
const Config           = require('../config/appconfig')

module.exports = function(context) {
  MetricsProcessor.loadMetrics(Config.newrelicOpts,Config.sumoOpts, context);
  context.done();
}
