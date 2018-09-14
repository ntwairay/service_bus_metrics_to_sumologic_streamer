const SumoLogger = require('./sumologger');

const loadMetrics = (newrelic, sumo, context) => {
  newrelic.queryConfig.forEach(request => {
    newrelic.insights.query(request.nrql, (err, responseBody) => {
      if (err) {
        context.log(err);
      }
      else {
        context.log(responseBody.results[0].events);
        sumo.rockendService=request.rockendService;
        sumo.azureService=request.azureService;
        SumoLogger.streamMetricsToSumo(sumo,responseBody.results[0].events, context);
      }
    })
  })
};

module.exports = {loadMetrics}
