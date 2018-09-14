module.exports = [
  {
    nrql:  { select : '*',
             from   : 'test',
             where  : { providerAccountId: 1}
    },
    rockendService: "rockend_invoicegenius_invoice",
    azureService: "servicebus"
  }
];
