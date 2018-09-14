const Insights         = require('node-insights');
const QueryConfig      = require('./queryconfig');

const newrelicOpts = {
  insights : new Insights({
    queryKey: process.env.QUERYKEY,
    accountId: process.env.ACCOUNTID
  }),
  queryConfig : QueryConfig
};

const sumoOpts = {
    endpoint: process.env.ENDPOINT,
    sessionKey: process.env.SESSIONKEY,
    sourceCategory: process.env.SOURCECATEGORY,
    sourceName: process.env.SOURCENAME,
    sendErrors: true,
    graphite: false,
    rockendService: "",
    azureService: "",
    onSuccess: () => {
    //  context.log("streaming log to sumologic at " + new Date());
    },
    onError: (err) => {
    //  context.log(err);
    }
    // ... any other options ...
};


module.exports = {newrelicOpts, sumoOpts}
