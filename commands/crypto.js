// Returns a list of cryptocurrency prices, as listed at CoinBase.
// This requests the latest spot price. This is somewhere between the buy and
// sell price, and is the same price you'll see listed when checking the app.

// TODO: Eventually, this could accept arguments for specific currencies, or
// requesting a different price.

const rp = require('request-promise');

module.exports = {
  description: 'Queries CoinBase for the latest spot prices.',
  call: cryptoPrice,
  help: () => { return 'help message goes here'; }
};

function cryptoPrice(args, res) {
  Promise.all([rp('https://api.coinbase.com/v2/prices/BTC-USD/spot'),
               rp('https://api.coinbase.com/v2/prices/ETH-USD/spot'),
               rp('https://api.coinbase.com/v2/prices/BCH-USD/spot'),
               rp('https://api.coinbase.com/v2/prices/LTC-USD/spot')])
  .then((responses) => {
    let message = 'CoinBase tells me these are the current prices:\n';
    for (let i = 0; i < responses.length; i++) {
      let response = responses[i];
      let priceData = JSON.parse(response);
      try {
        let currency = priceData && priceData.data && priceData.data.base;
        let amount = priceData && priceData.data && priceData.data.amount;
        message += currency + ': $' + amount + '\n';
      } catch (e) {
        message += 'error: see logs.';
        console.log('Error parsing price from CoinBase. Data received was: ' + response);
      }
    }
    res.sendMessage(message);
  }).catch((err) => {
    console.log('Failed executing Promises.all.then. Error: ' + err);
    return 'There was a problem getting the current prices from coinbase';
  });
}
