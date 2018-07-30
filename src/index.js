var Insights = require('node-insights');

var insights = new Insights({
  queryKey: process.env.QUERY_KEY,
  accountId: process.env.ACCOUNT_ID
});

var q = { select : '*', from: 'AzureServiceBusQueueSample',
          where  : { providerAccountId: process.env.PROVIDER_ACCOUNT_ID }};

var nrql = insights.nrql(q);

insights.query(q, function(err, responseBody) {
    console.log(responseBody.results[0])
})


//7542
//7804
