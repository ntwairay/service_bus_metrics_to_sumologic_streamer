module.exports = [
  /*{ select : 'average(activeMessages)',
    from   : 'AzureServiceBusQueueSample',
    where  : {
      providerAccountId: process.env.PROVIDER_ACCOUNT_ID
    }
  },*/
  { select : '*',
    from: 'AzureServiceBusQueueSample',
    where  : {
      providerAccountId: process.env.PROVIDER_ACCOUNT_ID
    }
  }
];
