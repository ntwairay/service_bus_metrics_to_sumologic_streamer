module.exports = [
  /*{ select : 'average(activeMessages)',
    from   : 'AzureServiceBusQueueSample',
    where  : {
      providerAccountId: 7542
    }
  },*/
  { select : '*',
    from: 'AzureServiceBusQueueSample',
    where  : {
      providerAccountId: process.env.PROVIDER_ID
    }
  }
];
