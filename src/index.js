const Insights = require('node-insights');
const SumoLogger = require('sumo-logger');

module.exports = function(context,myTimer) {

  const newrelicOpts = {
    insights : new Insights({
      queryKey: process.env.QUERY_KEY,
      accountId: process.env.ACCOUNT_ID
    }),
    query : { select : 'average(activeMessages)', from: 'AzureServiceBusQueueSample',
              where  : { providerAccountId: process.env.PROVIDER_ACCOUNT_ID }}
  }

  const sumoOpts = {
      endpoint: process.env.ENDPOINT,
      sessionKey: process.env.SESSIONKEY,
      sendErrors: true,
      sourceName: process.env.SOURCENAME,
      sourceCategory: process.env.SOURCECATEGORY,
      onSuccess: () => {
        context.log("streaming log to sumologic at " + new Date())
      },
      onError: (err) => {
        context.log(err)
      }
      // ... any other options ...
  };

  let metricsProcessor = (newrelic, sumo) => {
    newrelic.insights.query(newrelic.query, (err, responseBody) => {
      if (err) {
        context.log(err)
      }
      else {
        context.log(responseBody.results[0])
        streamMetricsToSumo(sumo,responseBody.results[0])
      }
    })
  }

  const streamMetricsToSumo = (opts, metrics, err) => {
    if (err) {
      context.log('Error on Rx: ', err);
    } else {
      const sumoLogger = new SumoLogger(opts);
      sumoLogger.log(metrics)
    }
  }

  metricsProcessor(newrelicOpts,sumoOpts);
}
