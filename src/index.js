const Insights = require('node-insights');
const SumoLogger = require('./sumologger')

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
      console.log("streaming log to sumologic at " + new Date())
    },
    onError: (err) => {
      console.log(err)
    }
    // ... any other options ...
};

let metricsProcessor = (newrelic, sumo) => {
  newrelic.insights.query(newrelic.query, (err, responseBody) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(responseBody.results[0])
      SumoLogger.streamMetricsToSumo(sumo,responseBody.results[0])
    }
  })
}

setInterval(metricsProcessor.bind(null,newrelicOpts,sumoOpts), 5600);


//7542
//7804
