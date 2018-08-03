const Insights         = require('node-insights');
const MetricsProcessor = require('./metricsProcessor');
const NewRelicQuery    = require('./query');

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

  MetricsProcessor.loadMetrics(newrelicOpts,sumoOpts);
  context.done();
}
