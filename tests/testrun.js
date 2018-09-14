const Insights  = require('node-insights');
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var query = require('../config/queryconfig')


const newrelic = new Insights({
  queryKey: process.env.QUERYKEY,
  accountId: process.env.ACCOUNTID
});

var empty_query =   { select : '*',
                      from   : 'test',
                      where  : { providerAccountId: 1}
                    }

describe('NewRelic connection test', () => {
  it('should not throw an Error if accountId and querykey is correct', () => {
    expect(() => {
      newrelic.query(empty_query, (err, responseBody) => {})
    }).to.not.throw(Error);
  })
});

const query_tester = (query) => {
  return new Promise((resolve, reject) => {
    newrelic.query(query, (err, responseBody) => {
      if(err) {
        reject(err);
      }
      else {
        resolve(responseBody);
      }
    })
  })
};

describe('Query validation test', () => {
  i = 1
  query.forEach(request => {
    it('Query '+ i++ + ' Response body should not have a property "error" ', () => {
      return query_tester(request.nrql).then(result => {
        expect(result).to.not.have.property('error')
      })
    }).timeout(8000);
  })
});
