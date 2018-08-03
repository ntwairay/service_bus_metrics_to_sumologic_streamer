const SumoLogger = require('./sumologger');

const loadMetrics = (newrelic, sumo) => {
  newrelic.query.forEach(queryRequest => {
    newrelic.insights.query(queryRequest, (err, responseBody) => {
      if (err) {
        context.log(err)
      }
      else {
        context.log(responseBody.results[0])
        SumoLogger.streamMetricsToSumo(sumo,responseBody.results[0])
      }
    })
  })
}

module.exports = {loadMetrics}
