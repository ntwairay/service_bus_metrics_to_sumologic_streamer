const Insights = require('node-insights');
const SumoLogger = require('./sumologger');
const NewRelicQuery = require('./query');

module.exports = function(context) {

  const newrelicOpts = {
    insights : new Insights({
      queryKey: process.env.QUERY_KEY,
      accountId: process.env.ACCOUNT_ID
    }),
    query : NewRelicQuery
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

  metricsProcessor(newrelicOpts,sumoOpts);
  context.done();
}
